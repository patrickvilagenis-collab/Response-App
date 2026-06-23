import { useApp } from "./state/store";
import { AppShell } from "./components/AppShell";
import { LoginScreen } from "./screens/LoginScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LibraryScreen } from "./screens/LibraryScreen";
import { ScenarioScreen } from "./screens/ScenarioScreen";
import { ResponseScreen } from "./screens/ResponseScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { WarmUpScreen } from "./screens/WarmUpScreen";
import { AdminScreen } from "./screens/AdminScreen";

export function App() {
  const { profile, route } = useApp();

  if (!profile || route.name === "login") {
    return <LoginScreen />;
  }

  if (route.name === "onboarding") {
    return <OnboardingScreen />;
  }

  let screen;
  switch (route.name) {
    case "home":
      screen = <HomeScreen />;
      break;
    case "library":
      screen = <LibraryScreen />;
      break;
    case "scenario":
      screen = <ScenarioScreen challengeId={route.challengeId} />;
      break;
    case "response":
      screen = <ResponseScreen challengeId={route.challengeId} />;
      break;
    case "results":
      screen = <ResultsScreen attemptId={route.attemptId} />;
      break;
    case "history":
      screen = <HistoryScreen />;
      break;
    case "settings":
      screen = <SettingsScreen />;
      break;
    case "warmup":
      screen = <WarmUpScreen />;
      break;
    case "admin":
      screen = <AdminScreen />;
      break;
    default:
      screen = <HomeScreen />;
  }

  return <AppShell>{screen}</AppShell>;
}
