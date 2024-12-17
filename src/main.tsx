import "@builder.io/qwik/qwikloader.js";
import { render } from "@builder.io/qwik";
import "./style.css";
import App from "@app";

render(document.getElementById("app") as HTMLElement, <App />);
