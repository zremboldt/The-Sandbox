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

const calculateButton = document.querySelector("#calculate-button");
const rootRc1Form = document.querySelector("#root-rc1-form");
const rootRc1Results = document.querySelector("#root-rc1-results");

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculateButton.classList.add("active");
  setTimeout(() => {
    calculateButton.classList.remove("active");
    rootRc1Form.classList.remove("active");
    rootRc1Results.classList.add("active");
  }, 1000);
});
