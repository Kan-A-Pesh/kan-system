import {WindowStore} from "@/stores/windows";

export type Command = (props: {
  printLn: (content: string) => void;
  args: string[];
  windowStore: WindowStore;
}) => Promise<boolean>;
