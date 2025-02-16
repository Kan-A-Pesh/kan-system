import Time from "./time";
import styles from "./taskbar.module.css";
import logo from "@/assets/logo.svg";
import TaskbarTabs from "./tabs";

export default function Taskbar() {
  return (
    <div className={styles.taskbar}>
      <div className={styles.startButton}>
        <img src={logo} />
        <span className={styles.startText}>start</span>
      </div>

      <TaskbarTabs />

      <div className={styles.time}>
        <Time />
      </div>
    </div>
  );
}
