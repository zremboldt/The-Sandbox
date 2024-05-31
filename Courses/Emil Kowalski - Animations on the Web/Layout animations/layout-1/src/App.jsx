import { motion } from "framer-motion";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="wrapper">
      <div className="phone">
        <motion.div
          onClick={() => setOpen((o) => !o)}
          className="element"
          layout
          animate={open ? { borderRadius: 30 } : { borderRadius: 8 }}
          style={
            open
              ? {
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }
              : { height: 48, width: 48 }
          }
        />
      </div>
    </div>
  );
}
