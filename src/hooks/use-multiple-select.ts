import { useStore, $, useComputed$ } from "@builder.io/qwik";

interface IMultiSelectState<T> {
  selectedList: T[];
}

export default function <T, K extends keyof T>(
  uniKey: K,
  multiSelectRestrictionCount: number
) {
  const state = useStore<IMultiSelectState<T>>({
    selectedList: [],
  });

  const isRestrictionCountReached = useComputed$(
    () => state.selectedList.length >= multiSelectRestrictionCount
  );

  const isInSelectedList = (value: T): boolean =>
    state.selectedList.some((item) => item[uniKey] === value[uniKey]);

  const isAvailable = (value: T) =>
    !isRestrictionCountReached.value && !isInSelectedList(value);

  const addItem = $((value: T) => {
    if (isAvailable(value)) {
      state.selectedList = [...state.selectedList, value];
    }
  });

  const removeItem = $((value: T): void => {
    state.selectedList = state.selectedList.filter(
      (item) => item[uniKey] !== value[uniKey]
    );
  });

  const clearSelected = $(() => {
    state.selectedList = [];
  });

  return {
    get selectedList() {
      return state.selectedList;
    },
    addItem,
    removeItem,
    isAvailable,
    clearSelected,
    selectRestrictionCount: multiSelectRestrictionCount,
  };
}
