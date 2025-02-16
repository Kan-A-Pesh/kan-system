import Tabs, {TabList} from "@/components/xp/tabs/tabs";
import {useState} from "react";
import WallpaperTab from "./tabs/wallpaper";

export default function SettingsWindow() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabList = [
    {
      name: "General",
      component: (
        <>
          <h4>General Settings</h4>
          <p>There is nothing to see here...</p>
        </>
      )
    },
    {
      name: "Wallpaper",
      component: <WallpaperTab />
    }
  ];

  return <Tabs menuTitle="Settings tabs" tabs={tabs} activeTabIndex={activeTab} onChange={setActiveTab} />;
}
