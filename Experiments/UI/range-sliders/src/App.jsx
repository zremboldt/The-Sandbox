import { motion } from "framer-motion";
import { useState } from "react";
import "./app.css";
import { AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";
import { useRef } from "react";
import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { useMotionTemplate } from "framer-motion";

export default function App() {
  const STARTING_VALUE = 40;
  const MIN = 0;
  const MAX = 100;
  const handleHeight = 84;

  const [value, setValue] = useState(STARTING_VALUE);
  const [indicatorValue, setIndicatorValue] = useState(STARTING_VALUE);
  const handleY = useMotionValue(0);
  const indicatorLightHeight = `${indicatorValue}%`;

  const constraintsRef = useRef();
  const progressBarRef = useRef();
  const handleRef = useRef();

  useEffect(() => {
    const newProgress = (MAX - value) / (MAX - MIN);
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();
    handleY.set(newProgress * progressBarBounds.height);
  }, [handleY, value]);

  const handleDragEnd = () => {
    setIndicatorValue(value < 2.5 ? 2.5 : value);
  };

  const handleDrag = () => {
    const handleBounds = handleRef.current.getBoundingClientRect();
    const middleOfHandle = handleBounds.top + handleBounds.height / 2;
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const progress =
      (middleOfHandle - progressBarBounds.top) / progressBarBounds.height; // Calculate the progress based on the middle of the handle relative to the invisible inner progress bar
    const reversedProgress = 1 - progress; // Reverse the progress
    const scaledProgress = Math.round(reversedProgress * (MAX - MIN)); // Scale the progress to the min-max range
    const clampedProgress = Math.min(MAX, Math.max(MIN, scaledProgress)); // Prevent values outside of 0-100 caused by dragElastic outside of the slider
    setValue(clampedProgress);
  };

  const sliderGlowPos = 80 + indicatorValue / 10;

  return (
    <>
      <div>{value}</div>
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
                <motion.div
                  className="indicator-light indicator-light-green"
                  animate={{
                    opacity: value / 20,
                    height: indicatorLightHeight,
                    transition: {
                      type: "spring",
                      damping: 20,
                    },
                  }}
                >
                  <div className="indicator-light-inner" />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="slider-container" ref={constraintsRef}>
            <div className="slider-track"></div>
            <div
              data-test="slider-progress"
              ref={progressBarRef}
              style={{
                position: "absolute",
                top: `${handleHeight / 2}px`,
                bottom: `${handleHeight / 2}px`,
                width: "2px",
                background: "gray",
                borderRadius: "99px",
                // opacity: 0.08,
                opacity: 0,
              }}
            />
            <motion.div
              drag="y"
              dragElastic={0.05}
              dragMomentum={false}
              dragConstraints={constraintsRef}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              className="slider-thumb-container"
              ref={handleRef}
              style={{ height: `${handleHeight}px`, y: handleY }}
            >
              <div className="slider-thumb-half">
                <motion.div
                  animate={{
                    opacity: indicatorValue < 20 ? indicatorValue / 50 : 0.5,
                    offsetDistance: `${sliderGlowPos}%`,
                  }}
                  className="glow reflect-green"
                />
                <div className="slider-thumb-top"></div>
              </div>
              <div className="slider-thumb-half">
                <motion.div
                  animate={{
                    opacity: indicatorValue < 20 ? indicatorValue / 50 : 0.5,
                    offsetDistance: `${sliderGlowPos}%`,
                  }}
                  className="glow reflect-green"
                />
                <div className="slider-thumb-bottom"></div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* <div className="control-set">
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
            <div className="slider-thumb-container">
              <div className="slider-thumb-half">
                <div className="glow reflect-orange"></div>
                <div className="slider-thumb-top"></div>
              </div>
              <div className="slider-thumb-half">
                <div className="glow reflect-orange"></div>
                <div className="slider-thumb-bottom"></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
