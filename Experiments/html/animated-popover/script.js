import { Pane } from "https://cdn.skypack.dev/tweakpane";

const config = {
  theme: "system",
};

const ctrl = new Pane({
  title: "Config",
  expanded: true,
});

ctrl.addBinding(config, "theme", {
  label: "Theme",
  options: {
    System: "system",
    Light: "light",
    Dark: "dark",
  },
});

const sync = () => {
  document.documentElement.dataset.theme = config.theme;
};

sync();

const handleChangeWithTransition = () => {
  if (!document.startViewTransition) return sync();
  document.startViewTransition(() => sync());
};

ctrl.on("change", handleChangeWithTransition);
