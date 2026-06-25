import { useMemo, useState } from "react";
import { useApp } from "../state/store";
import { COURSES, getCourse, coursePillar, localized } from "../data/learn";
import type { MicroCourse } from "../data/learn";
import { behaviorLabel } from "../data/leadershipFramework";
import { scenariosForBehavior } from "../lib/leadership";
import { bestAttemptsById } from "../lib/stats";
import { LearnVisual } from "../components/LearnVisual";
import type { LearnRecord } from "../types";

const PILLAR_NAME: Record<string, string> = { elevate: "Elevate", engage: "Engage", execute: "Execute" };
const PILLAR_ORDER = ["elevate", "engage", "execute"];

export function LearnScreen({ courseId }: { courseId?: string }) {
  const { t, locale, profile, go } = useApp();
  const [openId, setOpenId] = useState<string | null>(courseId ?? null);
  const progress = profile?.learnProgress ?? {};

  const open = openId ? getCourse(openId) : undefined;
  if (open) {
    return <CoursePlayer course={open} onClose={() => setOpenId(null)} />;
  }

  // Courses tied to the user's current growth areas come first.
  const gapBehaviors = new Set((profile?.devPlan?.growthAreas ?? []).map((g) => g.behavior));
  const recommended = COURSES.filter((c) => gapBehaviors.has(c.behavior));

  const byPillar = PILLAR_ORDER.map((p) => ({
    pillar: p,
    list: COURSES.filter((c) => coursePillar(c) === p),
  }));

  return (
    <div className="page learn">
      <div className="hero">
        <span className="eyebrow gold">{t("learn.eyebrow")}</span>
        <h1>{t("learn.title")}</h1>
        <p className="muted">{t("learn.subtitle")}</p>
      </div>

      {recommended.length > 0 && (
        <section className="learn-section">
          <h2 className="section-title">{t("learn.recommended")}</h2>
          <div className="learn-grid">
            {recommended.map((c) => (
              <CourseCard key={c.id} course={c} rec={progress[c.id]} locale={locale} t={t} onOpen={() => setOpenId(c.id)} />
            ))}
          </div>
        </section>
      )}

      {byPillar.map(({ pillar, list }) => (
        <section key={pillar} className="learn-section">
          <h2 className="section-title">
            <span className={`fw-pill-tag ${pillar}`}>{PILLAR_NAME[pillar]}</span>
          </h2>
          <div className="learn-grid">
            {list.map((c) => (
              <CourseCard key={c.id} course={c} rec={progress[c.id]} locale={locale} t={t} onOpen={() => setOpenId(c.id)} />
            ))}
          </div>
        </section>
      ))}

      <p className="muted small learn-foot">{t("learn.foot")}</p>
      <div className="learn-foot-actions">
        <button className="btn ghost" onClick={() => go({ name: "framework" })}>{t("learn.toFramework")}</button>
      </div>
    </div>
  );
}

function CourseCard({
  course,
  rec,
  locale,
  t,
  onOpen,
}: {
  course: MicroCourse;
  rec?: LearnRecord;
  locale: ReturnType<typeof useApp>["locale"];
  t: (k: string) => string;
  onOpen: () => void;
}) {
  const pillar = coursePillar(course);
  const done = rec?.completed;
  return (
    <button className={`learn-card ${done ? "done" : ""}`} onClick={onOpen}>
      <LearnVisual icon={course.icon} pillar={pillar} size={72} />
      <div className="learn-card-body">
        <h3 className="learn-card-title">{localized(course.title, locale)}</h3>
        <p className="learn-card-sub muted small">{localized(course.subtitle, locale)}</p>
        <div className="learn-card-meta">
          <span className="learn-min">{course.durationMin} {t("learn.min")}</span>
          {done ? (
            <span className="learn-badge done">✓ {t("learn.done")}{rec?.quizScore != null ? ` · ${rec.quizScore}%` : ""}</span>
          ) : (
            <span className="learn-badge">{t("learn.start")} →</span>
          )}
        </div>
      </div>
    </button>
  );
}

// --- Course player: teaching slides → quick quiz → completion + practice link ---

type Phase = "teach" | "quiz" | "done";

function CoursePlayer({ course, onClose }: { course: MicroCourse; onClose: () => void }) {
  const { t, locale, profile, updateProfile, go, attempts } = useApp();
  const pillar = coursePillar(course);
  // Teaching slides: the cards, then a "tool" slide.
  const slides = course.cards.length + 1; // +1 tool slide
  const [phase, setPhase] = useState<Phase>("teach");
  const [slide, setSlide] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const bestById = useMemo(() => bestAttemptsById(attempts), [attempts]);

  function nextTeach() {
    if (slide < slides - 1) setSlide(slide + 1);
    else setPhase("quiz");
  }
  function prevTeach() {
    if (slide > 0) setSlide(slide - 1);
    else onClose();
  }

  function answer(i: number) {
    if (picked != null) return;
    setPicked(i);
    if (i === course.quiz[qi].correct) setCorrectCount((c) => c + 1);
  }
  function nextQuestion() {
    if (qi < course.quiz.length - 1) {
      setQi(qi + 1);
      setPicked(null);
    } else {
      finish();
    }
  }
  function finish() {
    const score = Math.round((correctCount / course.quiz.length) * 100);
    const prev = profile?.learnProgress?.[course.id];
    const rec: LearnRecord = {
      completed: true,
      quizScore: Math.max(prev?.quizScore ?? 0, score),
      completedAt: new Date().toISOString(),
    };
    updateProfile({ learnProgress: { ...(profile?.learnProgress ?? {}), [course.id]: rec } });
    setPhase("done");
  }

  const pct =
    phase === "done" ? 100 : phase === "quiz" ? 60 + Math.round((qi / course.quiz.length) * 35) : Math.round((slide / slides) * 55);

  return (
    <div className="page learn-player">
      <div className="learn-player-top">
        <button className="btn ghost sm" onClick={onClose}>✕</button>
        <div className="learn-progress"><span style={{ width: `${pct}%` }} /></div>
      </div>

      {phase === "teach" && (
        <TeachSlide course={course} pillar={pillar} slide={slide} locale={locale} t={t} onNext={nextTeach} onPrev={prevTeach} />
      )}

      {phase === "quiz" && (
        <div className="learn-slide quiz">
          <span className="learn-kicker">{t("learn.quizTitle")} · {t("learn.question")} {qi + 1} {t("learn.of")} {course.quiz.length}</span>
          <h2 className="learn-q">{localized(course.quiz[qi].q, locale)}</h2>
          <div className="learn-options">
            {course.quiz[qi].options.map((o, i) => {
              const isCorrect = i === course.quiz[qi].correct;
              const state = picked == null ? "" : isCorrect ? "correct" : i === picked ? "wrong" : "dim";
              return (
                <button key={i} className={`learn-option ${state}`} onClick={() => answer(i)} disabled={picked != null}>
                  {localized(o, locale)}
                </button>
              );
            })}
          </div>
          {picked != null && (
            <div className={`learn-feedback ${picked === course.quiz[qi].correct ? "good" : "bad"}`}>
              <strong>{picked === course.quiz[qi].correct ? t("learn.correct") : t("learn.notQuite")}</strong>
              <span>{localized(course.quiz[qi].why, locale)}</span>
            </div>
          )}
          <div className="learn-nav">
            <button className="btn primary" onClick={nextQuestion} disabled={picked == null}>
              {qi < course.quiz.length - 1 ? t("learn.next") : t("learn.finish")}
            </button>
          </div>
        </div>
      )}

      {phase === "done" && (
        <DoneSlide course={course} pillar={pillar} score={Math.round((correctCount / course.quiz.length) * 100)} locale={locale} t={t}
          onPractice={() => {
            const s = scenariosForBehavior(course.behavior, bestById, 1)[0];
            if (s) go({ name: "scenario", challengeId: s.id });
            else go({ name: "library" });
          }}
          onClose={onClose}
        />
      )}
    </div>
  );
}

function TeachSlide({
  course,
  pillar,
  slide,
  locale,
  t,
  onNext,
  onPrev,
}: {
  course: MicroCourse;
  pillar: string | null;
  slide: number;
  locale: ReturnType<typeof useApp>["locale"];
  t: (k: string) => string;
  onNext: () => void;
  onPrev: () => void;
}) {
  const isTool = slide === course.cards.length;
  return (
    <div className="learn-slide teach">
      <LearnVisual icon={course.icon} pillar={pillar} size={110} />
      {!isTool ? (
        <>
          <span className="learn-kicker">{localized(course.title, locale)}</span>
          <h2 className="learn-h">{localized(course.cards[slide].heading, locale)}</h2>
          <p className="learn-body">{localized(course.cards[slide].body, locale)}</p>
        </>
      ) : (
        <>
          <span className="learn-kicker">{t("learn.tool")}</span>
          <h2 className="learn-h">{localized(course.tool.name, locale)}</h2>
          <p className="learn-body">{localized(course.tool.desc, locale)}</p>
          <div className="learn-steps">
            <span className="learn-steps-label">{t("learn.steps")}</span>
            <ol>
              {course.tool.steps.map((s, i) => (
                <li key={i}>{localized(s, locale)}</li>
              ))}
            </ol>
          </div>
        </>
      )}
      <div className="learn-dots" aria-hidden="true">
        {Array.from({ length: course.cards.length + 1 }).map((_, i) => (
          <span key={i} className={i === slide ? "on" : ""} />
        ))}
      </div>
      <div className="learn-nav">
        <button className="btn ghost" onClick={onPrev}>{slide === 0 ? t("learn.back") : t("learn.prev")}</button>
        <button className="btn primary" onClick={onNext}>{isTool ? t("learn.startQuiz") : t("learn.next")}</button>
      </div>
    </div>
  );
}

function DoneSlide({
  course,
  pillar,
  score,
  locale,
  t,
  onPractice,
  onClose,
}: {
  course: MicroCourse;
  pillar: string | null;
  score: number;
  locale: ReturnType<typeof useApp>["locale"];
  t: (k: string) => string;
  onPractice: () => void;
  onClose: () => void;
}) {
  const behaviorName = behaviorLabel(course.behavior, locale);
  return (
    <div className="learn-slide done">
      <LearnVisual icon={course.icon} pillar={pillar} size={110} />
      <span className="learn-kicker gold">{t("learn.resultTitle")}</span>
      <div className="learn-score" style={{ color: score >= 67 ? "#16a34a" : score >= 34 ? "#eab308" : "#ef4444" }}>{score}%</div>
      <span className="muted small">{t("learn.score")}</span>
      <div className="learn-takeaway">
        <span className="learn-takeaway-label">{t("learn.takeawayLabel")}</span>
        <p>{localized(course.takeaway, locale)}</p>
      </div>
      <p className="muted small learn-builds">{t("learn.builds")}: <strong>{behaviorName}</strong></p>
      <div className="learn-nav col">
        <button className="btn primary" onClick={onPractice}>{t("learn.practiceCta")} →</button>
        <button className="btn ghost" onClick={onClose}>{t("learn.backToList")}</button>
      </div>
    </div>
  );
}
