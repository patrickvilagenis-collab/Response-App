import { useApp } from "./state/store";
import { AppShell } from "./components/AppShell";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LibraryScreen } from "./screens/LibraryScreen";
import { ScenarioScreen } from "./screens/ScenarioScreen";
import { ResponseScreen } from "./screens/ResponseScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

export function App() {
  const { profile, route } = useApp();

  if (!profile || route.name === "login") {
    return <LoginScreen />;
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
    default:
      screen = <HomeScreen />;
  }

  return <AppShell>{screen}</AppShell>;
}
