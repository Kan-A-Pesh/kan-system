import styles from "./taskbar.module.css";
import clsx from "clsx";
import useWindowStore from "@/stores/windows";
import {useMemo} from "react";

export default function TaskbarTabs() {
  const windowStore = useWindowStore();

  const focusedWindow = useMemo(() => windowStore.orders.slice(-1)[0], [windowStore.orders]);

  return (
    <div className={styles.openedTabs}>
      {Object.entries(windowStore.windows).map(([id, props]) => (
        <div
          key={id}
          className={clsx(styles.openTab, focusedWindow === id && styles.active)}
          onClick={() => windowStore.focus(id)}
        >
          {props.title}
        </div>
      ))}
    </div>
  );
}
