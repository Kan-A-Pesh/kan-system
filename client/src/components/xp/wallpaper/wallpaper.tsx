import useWallpaperStore from "@/stores/wallpaper";
import {WallpaperList} from "./list";
import styles from "./wallpaper.module.css";

export default function Wallpaper() {
  const wallpaper = useWallpaperStore((state) => state.wallpaper);

  return (
    <img
      src={WallpaperList[wallpaper].src}
      alt="wallpaper"
      className={styles.wallpaper}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
}
