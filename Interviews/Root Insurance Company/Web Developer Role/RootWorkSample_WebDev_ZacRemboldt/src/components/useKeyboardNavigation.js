import { useEffect } from "react";

// It didn't feel right cluttering up the App component with
// this global functionality so I put it in a custom hook.

const useKeyboardNavigation = () => {
  useEffect(() => {
    // We need the blue focus outline for accessibility but don't want to see it otherwise.
    // This fn hides the outline on elements unless tab is pressed.
    // Tab tells the page "I am a keyboard user".
    const handleFirstTab = e => {
      if (e.keyCode === 9) {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };

    window.addEventListener("keydown", handleFirstTab);
    return () => window.removeEventListener("keydown", handleFirstTab); // Clean up
  }, []);
};

export default useKeyboardNavigation;
