import {WindowRegistry} from "../../registry";
import {Command} from "../types/command";

export const run: Command = async ({printLn, args, windowStore}) => {
  const [executable, title] = args;

  // Check if required arguments are present
  if (!executable) {
    printLn(`Usage 'run <executable> [title]'`);
    return false;
  }

  // Check if arguments are valid
  if (!(executable in WindowRegistry)) {
    printLn(`Unknown executable '${executable}' in run command.`);
    printLn(`List of available executables: ${Object.keys(WindowRegistry).join(", ")}`);
    return false;
  }

  const executableData = WindowRegistry[executable as keyof typeof WindowRegistry];

  windowStore.create({
    props: {
      title: title || executableData.title,
      children: executableData.children
    }
  });

  return true;
};
