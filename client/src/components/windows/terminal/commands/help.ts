import {Command} from "../types/command";
import {CommandList} from "../types/list";

export const help: Command = async ({printLn}) => {
  printLn(`List of all commands:`);

  const maxCmdLen = Math.max(...Object.keys(CommandList).map((c) => c.length));

  Object.entries(CommandList).forEach(([cmd, {man}]) => {
    printLn(`- ${cmd.padEnd(maxCmdLen)} : ${man}`);
  });

  return true;
};
