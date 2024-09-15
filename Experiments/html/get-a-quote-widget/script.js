const themeButton = document.querySelector(".theme-button");

const toggleTheme = () => {
  document.documentElement.dataset.theme === "light"
    ? (document.documentElement.dataset.theme = "dark")
    : (document.documentElement.dataset.theme = "light");
};

const toggleWithTransition = () => {
  if (!document.startViewTransition) return toggleTheme();
  document.startViewTransition(() => toggleTheme());
};

themeButton.addEventListener("click", toggleWithTransition);
