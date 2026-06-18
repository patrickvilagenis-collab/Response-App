import type { Locale } from "../types";

// Thin wrapper over the Web Speech API with graceful capability detection.

const RECOG_LANG: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  "es-ES": "es-ES",
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
};

function getCtor(): (new () => SpeechRecognitionLike) | null {
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function speechSupported(): boolean {
  return getCtor() !== null;
}

export interface VoiceSession {
  stop: () => void;
}

/**
 * Start a voice session. Streams interim + final transcript via onTranscript.
 * onError fires for permission/availability problems so the UI can fall back to text.
 */
export function startVoice(
  locale: Locale,
  onTranscript: (text: string, isFinal: boolean) => void,
  onError: (kind: "denied" | "unsupported" | "error") => void
): VoiceSession | null {
  const Ctor = getCtor();
  if (!Ctor) {
    onError("unsupported");
    return null;
  }
  const recog = new Ctor();
  recog.lang = RECOG_LANG[locale];
  recog.continuous = true;
  recog.interimResults = true;

  let finalText = "";
  recog.onresult = (e: any) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const chunk = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += chunk + " ";
      else interim += chunk;
    }
    onTranscript((finalText + interim).trim(), false);
  };
  recog.onerror = (e: any) => {
    if (e?.error === "not-allowed" || e?.error === "service-not-allowed") onError("denied");
    else onError("error");
  };
  recog.onend = () => {
    onTranscript(finalText.trim(), true);
  };

  try {
    recog.start();
  } catch {
    onError("error");
    return null;
  }
  return { stop: () => recog.stop() };
}

export async function testMicrophone(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return true;
  } catch {
    return false;
  }
}
