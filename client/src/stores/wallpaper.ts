import {WallpaperKeys} from "@/components/xp/wallpaper/list";
import {create} from "zustand";

interface WallpaperStore {
  wallpaper: WallpaperKeys;
  change: (wallpaper: WallpaperKeys) => void;
}

const useWallpaperStore = create<WallpaperStore>((set) => ({
  wallpaper: "bliss",
  change: (wallpaper: WallpaperKeys): void => {
    set({wallpaper: wallpaper});
  }
}));

export default useWallpaperStore;
