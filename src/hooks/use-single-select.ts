import { $, useStore } from "@builder.io/qwik";

interface ISingleSelectState<T> {
  selected: T | null;
}

export default function <T, K extends keyof T>(uniKey: K) {
  const state = useStore<ISingleSelectState<T>>({
    selected: null,
  });

  const addItem = $((value: T) => {
    state.selected = value;
  });

  const removeItem = $(() => {
    state.selected = null;
  });

  const isAvailable = (value: T): boolean =>
    state.selected ? !(state.selected[uniKey] === value[uniKey]) : true;

  return {
    get selected() {
      return state.selected;
    },
    addItem,
    removeItem,
    isAvailable,
  };
}
