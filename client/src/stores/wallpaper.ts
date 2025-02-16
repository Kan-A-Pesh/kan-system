import {WallpaperKeys} from "@/components/xp/wallpaper/list";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface WallpaperStore {
  wallpaper: WallpaperKeys;
  change: (wallpaper: WallpaperKeys) => void;
}

const useWallpaperStore = create(
  persist<WallpaperStore>(
    (set) => ({
      wallpaper: "bliss",
      change: (wallpaper: WallpaperKeys): void => {
        set({wallpaper: wallpaper});
      }
    }),
    {name: "wallpaper-store"}
  )
);
export default useWallpaperStore;
