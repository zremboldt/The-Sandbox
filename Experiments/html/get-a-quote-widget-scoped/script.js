const themeButton = document.querySelector(".theme-button");

const wrapper = document.getElementById("root-rc1-widget");

const toggleTheme = () => {
  wrapper.dataset.theme === "light"
    ? (wrapper.dataset.theme = "dark")
    : (wrapper.dataset.theme = "light");
};

const toggleWithTransition = () => {
  if (!document.startViewTransition) return toggleTheme();
  document.startViewTransition(() => toggleTheme());
};

themeButton.addEventListener("click", toggleWithTransition);
