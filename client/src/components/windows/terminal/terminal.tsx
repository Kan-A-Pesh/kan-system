import {KeyboardEvent, startTransition, useCallback, useEffect, useState} from "react";
import {CommandList} from "./types/list";
import {parseCmd} from "./utils/parseCmd";
import styles from "./terminal.module.css";
import useWindowStore from "@/stores/windows";

const START_TEXT = "KanOS Terminal\nType 'help' for a list of commands.\n\n";
const CURSOR_BLINKING_INTERVAL = 500;

export default function TerminalWindow() {
  const [input, setInput] = useState("");
  const [content, setContent] = useState<string[]>([START_TEXT]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [cursorBlinking, setCursorBlinking] = useState<boolean>(false);

  const windowStore = useWindowStore();

  const printLn = (ln: string, append: boolean = false) => {
    setContent((prev) => [...prev, ln + (append ? "" : "\n")]);
  };

  const onExecute = useCallback(
    (cmd: string) => {
      // Parse arguments
      const [arg0, ...args] = parseCmd(cmd);

      // Execute command
      if (arg0 in CommandList) {
        CommandList[arg0 as keyof typeof CommandList].run({printLn, args, windowStore});
      } else {
        printLn("Unknown command: " + arg0);
      }
    },
    [windowStore]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Execute command
      if (e.key === "Enter") {
        printLn(">" + input);
        onExecute(input);
        setInput("");
        return;
      }

      // Backspace
      if (e.key === "Backspace" && input.length > 0) {
        setInput((prev) => prev.slice(0, -1));
        return;
      }

      // Input
      if (e.key.length === 1) {
        setInput((prev) => prev + e.key);
        return;
      }
    },
    [input, onExecute]
  );

  const onFocus = useCallback(() => setIsFocused(true), []);
  const onBlur = useCallback(
    () =>
      startTransition(() => {
        setIsFocused(false);
        setCursorBlinking(false);
      }),
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isFocused) return;

      setCursorBlinking((prev) => !prev);
    }, CURSOR_BLINKING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [cursorBlinking, isFocused]);

  return (
    <pre tabIndex={0} onKeyDown={onKeyDown} onFocus={onFocus} onBlur={onBlur} className={styles.terminal}>
      {content.join("")}
      {">"}
      {input}
      {cursorBlinking && "_"}
    </pre>
  );
}
