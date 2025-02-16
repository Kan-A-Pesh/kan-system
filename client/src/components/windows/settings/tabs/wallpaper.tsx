import useWallpaperStore from "@/stores/wallpaper";
import styles from "../settings.module.css";
import {WallpaperKeys, WallpaperList} from "@/components/xp/wallpaper/list";
import clsx from "clsx";

export default function WallpaperTab() {
  const wallpaperStore = useWallpaperStore();

  return (
    <>
      <h4>Wallpaper tab</h4>
      <p>Click on a wallpaper to select it</p>
      <br />

      <div className={styles.wallpaperGrid}>
        {Object.entries(WallpaperList).map(([name, data]) => (
          <div
            key={name}
            onClick={() => wallpaperStore.change(name as WallpaperKeys)}
            className={clsx(wallpaperStore.wallpaper === name && styles.wallpaperGridActive)}
          >
            <img src={data.src} alt={data.name} />
            <span>{data.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
