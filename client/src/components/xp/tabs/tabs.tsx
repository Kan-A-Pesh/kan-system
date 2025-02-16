import React from "react";

export type TabList = {
  name: string;
  component?: React.ReactNode;
}[];

interface TabsProps {
  menuTitle?: string;
  activeTabIndex: number;
  tabs: TabList;
  onChange: (newActiveTabIndex: number) => void;
}

export default function Tabs(props: TabsProps) {
  return (
    <section className="tabs">
      <menu role="tablist" aria-label={props.menuTitle}>
        {props.tabs.map(({name}, index) => (
          <button
            key={index}
            aria-selected={index === props.activeTabIndex}
            onClick={() => props.onChange(index)}
            role="tab"
          >
            <span>{name}</span>
          </button>
        ))}
      </menu>

      <article role="tabpanel">{props.tabs[props.activeTabIndex].component}</article>
    </section>
  );
}
