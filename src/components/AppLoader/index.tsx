import { component$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./style.module.css";

export default component$(() => {
  useVisibleTask$(() => {
    const loaderWrapper = document.createElement("div");
    loaderWrapper.className = styles.appLoaderWrapper;

    const loader = document.createElement("div");
    loader.className = styles.appLoader;

    loaderWrapper.appendChild(loader);

    document.body.appendChild(loaderWrapper);

    return () => {
      document.body.removeChild(loaderWrapper);
    };
  });

  return null;
});
