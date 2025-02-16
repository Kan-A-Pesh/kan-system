import ascent from "@/assets/wallpapers/ascent.jpg";
import autumn from "@/assets/wallpapers/autumn.jpg";
import azul from "@/assets/wallpapers/azul.jpg";
import bliss from "@/assets/wallpapers/bliss.jpg";
import crystal from "@/assets/wallpapers/crystal.jpg";
import follow from "@/assets/wallpapers/follow.jpg";
import friend from "@/assets/wallpapers/friend.jpg";
import home from "@/assets/wallpapers/home.jpg";
import moonFlower from "@/assets/wallpapers/moon-flower.jpg";
import peace from "@/assets/wallpapers/peace.jpg";
import power from "@/assets/wallpapers/power.jpg";
import purpleFlower from "@/assets/wallpapers/purple-flower.jpg";
import radiance from "@/assets/wallpapers/radiance.jpg";
import redMoonDesert from "@/assets/wallpapers/red-moon-desert.jpg";
import ripples from "@/assets/wallpapers/ripples.jpg";
import stonehenge from "@/assets/wallpapers/stonehenge.jpg";
import tulips from "@/assets/wallpapers/tulips.jpg";
import vortecSpace from "@/assets/wallpapers/vortec-space.jpg";
import wind from "@/assets/wallpapers/wind.jpg";

export const WallpaperList = {
  ascent: {name: "Ascent", src: ascent},
  autumn: {name: "Autumn", src: autumn},
  azul: {name: "Azul", src: azul},
  bliss: {name: "Bliss", src: bliss},
  crystal: {name: "Crystal", src: crystal},
  follow: {name: "Follow", src: follow},
  friend: {name: "Friends", src: friend},
  home: {name: "Home", src: home},
  moonFlower: {name: "Moon Flower", src: moonFlower},
  peace: {name: "Peace", src: peace},
  power: {name: "Power", src: power},
  purpleFlowers: {name: "Purple Flowers", src: purpleFlower},
  radiance: {name: "Radiance", src: radiance},
  redMoonDesert: {name: "Red Moon Desert", src: redMoonDesert},
  ripples: {name: "Ripples", src: ripples},
  stonehenge: {name: "Stonehenge", src: stonehenge},
  tulips: {name: "Tulips", src: tulips},
  vortecSpace: {name: "Vortex Space", src: vortecSpace},
  wind: {name: "Wind", src: wind}
} as const;

export type WallpaperKeys = keyof typeof WallpaperList;
