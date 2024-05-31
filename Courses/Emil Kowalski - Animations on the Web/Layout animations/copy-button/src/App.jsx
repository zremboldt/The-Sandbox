import { motion } from "framer-motion";
import { useState } from "react";
import "./app.css";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";

export default function App() {
  const [copied, setCopied] = useState(false);

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  const copy = () => {
    navigator.clipboard.writeText("This text was copied to the clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <button>Standard</button>
      <button className="btn-sm">Small</button>
      <button
        aria-label="Copy code snippet"
        className="btn-icon"
        onClick={copy}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="checkmark"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.15 }}
            >
              <Check size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.15 }}
            >
              <Copy size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
  );
}
