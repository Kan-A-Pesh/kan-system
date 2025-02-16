import {WindowProps} from "@/components/xp/window/window";
import {create} from "zustand";

export interface WindowStore {
  windows: {[key: string]: WindowProps};
  orders: string[];
  create: (props: {props: WindowProps; id?: string}) => void;
  focus: (id: string) => void;
  kill: (id: string) => void;
}

const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  orders: [],

  create: (props) => {
    const id = props.id || `wd-${Math.random().toString(36).substring(2)}`;

    set((store) => ({
      windows: {
        ...store.windows,
        [id]: props.props
      },
      orders: [...store.orders, id]
    }));
  },
  focus: (id) => {
    set((store) => ({orders: [...store.orders.filter((orderId) => orderId !== id), id]}));
  },
  kill: (id) => {
    set((store) => {
      const newWindows = {...store.windows};
      delete newWindows[id];

      return {
        windows: newWindows,
        orders: store.orders.filter((orderId) => orderId !== id)
      };
    });
  }
}));

export default useWindowStore;
