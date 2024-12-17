import { component$, Slot } from "@builder.io/qwik";
import styles from "./style.module.css";

export default component$(() => (
  <div class={styles.errorMessage}>
    <Slot />
  </div>
));
