import TerminalWindow from "@/components/windows/terminal/terminal";
import Taskbar from "@/components/xp/taskbar/taskbar";
import Wallpaper from "@/components/xp/wallpaper/wallpaper";
import WindowContainer from "@/components/xp/window/container";
import useWindowStore from "@/stores/windows";
import {useEffect} from "react";

export default function App() {
  const windowStore = useWindowStore();

  useEffect(() => {
    if (Object.keys(windowStore.windows).length > 0) return;

    windowStore.create({
      props: {
        title: "Terminal",
        children: <TerminalWindow />
      }
    });
  }, []);

  return (
    <>
      <WindowContainer />
      <Taskbar />
      <Wallpaper />
    </>
  );
}
