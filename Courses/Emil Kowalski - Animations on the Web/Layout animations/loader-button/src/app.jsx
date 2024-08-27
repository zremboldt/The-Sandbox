import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "./spinner";
import { RootLogo } from "./assets/root-logo.jsx";
import "./app.css";

const buttonCopy = {
  idle: "Send me a login link",
  loading: <Spinner size={22} color="rgba(255, 255, 255, 0.65)" />,
  success: "Login link sent!",
};

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState("idle");

  const handleClick = () => {
    if (buttonState === "success") return;

    setButtonState("loading");

    setTimeout(() => {
      setButtonState("success");
    }, 1750);

    setTimeout(() => {
      setButtonState("idle");
    }, 3500);
  };

  return (
    <>
      <header className="relative w-full flex justify-between items-center p-2 z-10">
        <RootLogo />
      </header>
      <div className="wrap">
        <button
          className="btn-gradient btn-multi-state"
          disabled={buttonState === "loading"}
          onClick={handleClick}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={buttonState}
              initial={{ y: -35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 35, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            >
              {buttonCopy[buttonState]}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
