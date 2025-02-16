import {help} from "../commands/help";
import {run} from "../commands/run";

export const CommandList = {
  help: {man: "Shows this message", run: help},
  run: {man: "Opens a new window", run: run}
} as const;
