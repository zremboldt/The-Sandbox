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
    <div className="board">
      <div className="control-set">
        <div className="indicator-container">
          <div className="indicator-left">
            <div className="text-container">
              <label htmlFor="threshold">Threshold</label>
              <span>54</span>
              <span>45</span>
              <span>36</span>
              <span>27</span>
              <span>18</span>
              <span>9</span>
              <span>0</span>
            </div>
          </div>
          <div className="indicator-right">
            <div className="indicator-track">
              <div className="indicator-light indicator-light-green"></div>
            </div>
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-track"></div>
          <div className="slider-thumb-container left-slider">
            <div className="slider-thumb-top-container">
              <div className="glow reflect-green"></div>
              <div className="slider-thumb-top"></div>
            </div>
            <div className="slider-thumb-bottom-container">
              <div className="glow reflect-green"></div>
              <div className="slider-thumb-bottom"></div>
            </div>
          </div>
          {/* <input className="slider" type="range" name="range" /> */}
        </div>
      </div>
      <div className="control-set">
        <div className="indicator-container">
          <div className="indicator-left">
            <div className="text-container">
              <label htmlFor="range">Range</label>
              <span>18</span>
              <span>15</span>
              <span>12</span>
              <span>9</span>
              <span>6</span>
              <span>3</span>
              <span>0</span>
            </div>
          </div>
          <div className="indicator-right">
            <div className="indicator-track">
              <div className="indicator-light indicator-light-orange"></div>
            </div>
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-track"></div>
          <div className="slider-thumb-container right-slider">
            <div className="slider-thumb-top-container">
              <div className="glow reflect-orange"></div>
              <div className="slider-thumb-top"></div>
            </div>
            <div className="slider-thumb-bottom-container">
              <div className="glow reflect-orange"></div>
              <div className="slider-thumb-bottom"></div>
            </div>
          </div>
          {/* <input className="slider" type="range" name="range" /> */}
        </div>
      </div>
    </div>
  );
}
