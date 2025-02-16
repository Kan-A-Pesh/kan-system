import CupcakeWindow from "./cupcake/cupcake";
import DebugWindow from "./debug/debug";
import InternetExplorerWindow from "./internet-explorer/internet-explorer";
import SettingsWindow from "./settings/settings";
import TerminalWindow from "./terminal/terminal";

export const WindowRegistry = {
  terminal: {title: "Terminal", children: <TerminalWindow />},
  debug: {title: "Debug", children: <DebugWindow />},
  settings: {title: "Settings", children: <SettingsWindow />},
  ie: {title: "Internet Explorer", children: <InternetExplorerWindow />},
  cupcake: {title: "Cupcake Clicker", children: <CupcakeWindow />}
} as const;
