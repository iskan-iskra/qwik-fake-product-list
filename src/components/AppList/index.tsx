import { component$, JSX } from "@builder.io/qwik";
import styles from "./style.module.css";

interface IProps {
  mode?: "horizontal" | "vertical";
  title?: JSX.Element | JSX.Element[];
  list?: JSX.Element | JSX.Element[];
  listActions?: JSX.Element | JSX.Element[];
}

export default component$<IProps>(
  ({ mode = "horizontal", list, listActions, title }) => (
    <div class={styles.appListWrapper}>
      {title && (
        <div class={styles.appTitleWrapper}>
          {Array.isArray(title) ? title : [title]}
        </div>
      )}
      {list && (
        <div class={`${styles.appList} ${styles[mode]}`}>
          {Array.isArray(list) ? list : [list]}
        </div>
      )}
      {listActions && (
        <div class={styles.appActionsWrapper}>
          {Array.isArray(listActions) ? listActions : [listActions]}
        </div>
      )}
    </div>
  )
);
