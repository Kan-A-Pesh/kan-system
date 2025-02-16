import useWindowStore from "@/stores/windows";
import Window from "./window";
import {useMemo} from "react";

export default function WindowContainer() {
  const windowStore = useWindowStore();

  const orderIndexMap = useMemo(
    () => windowStore.orders.reduce((acc, curr, index) => ({...acc, [curr]: index}), {} as {[key: string]: number}),
    [windowStore.orders]
  );

  return Object.entries(windowStore.windows).map(([id, props]) => (
    <Window
      key={id}
      {...props}
      order={orderIndexMap[id]}
      onCloseClick={() => windowStore.kill(id)}
      onMaximizeClick={() => {}}
      onMinimizeClick={() => {}}
      onClick={() => windowStore.focus(id)}
    />
  ));
}
