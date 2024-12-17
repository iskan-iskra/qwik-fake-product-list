import { component$, JSX, Slot } from "@builder.io/qwik";
import styles from "./style.module.css";

type IProps = JSX.IntrinsicElements["button"];

export default component$<IProps>(({ ...props }) => (
  <button class={styles.appButton} {...props}>
    <Slot />
  </button>
));
