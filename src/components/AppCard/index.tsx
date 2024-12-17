import { component$, JSX } from "@builder.io/qwik";
import styles from "./style.module.css";

interface IProps {
  name: string;
  actions?: JSX.Element | JSX.Element[];
}

export default component$<IProps>(({ name, actions }) => (
  <div class={styles.appCard}>
    <div>{name}</div>
    {actions && (
      <div class={styles.appActionsWrapper}>
        {Array.isArray(actions) ? actions : [actions]}
      </div>
    )}
  </div>
));
