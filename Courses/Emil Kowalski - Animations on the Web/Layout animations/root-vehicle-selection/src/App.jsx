import { motion } from "framer-motion";
import { useState } from "react";
import "./app.css";
import imgOdyssey from "./assets/odyssey.avif";
import imgWrx from "./assets/wrx-sti.avif";
import imgHighlander from "./assets/highlander.avif";
import imgChallenger from "./assets/challenger.avif";
import imgCivic from "./assets/civic.avif";
import { useOnClickOutside } from "usehooks-ts";
import { useEffect } from "react";
import { useRef } from "react";
import { RootLogo } from "./assets/root-logo.jsx";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const [activeVehicle, setActiveVehicle] = useState(null);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActiveVehicle(null));

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActiveVehicle(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="relative w-full flex justify-between items-center p-2 z-10">
        <RootLogo />
      </header>
      <main>
        <div className="wrap">
          <AnimatePresence>
            {activeVehicle ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="modal-overlay"
                />
                <div className="modal-wrap">
                  <motion.div
                    className="modal"
                    layoutId={`vehicle-container-${activeVehicle.id}`}
                    ref={ref}
                  >
                    <motion.img
                      src={activeVehicle.image}
                      layoutId={`vehicle-image-${activeVehicle.id}`}
                    />
                    <div className="content">
                      <div className="header">
                        <div className="text-content">
                          <motion.h2
                            layoutId={`vehicle-title-${activeVehicle.id}`}
                          >
                            {activeVehicle.year} {activeVehicle.make}{" "}
                            {activeVehicle.model}
                          </motion.h2>
                          <motion.p
                            layoutId={`vehicle-covered-${activeVehicle.id}`}
                          >
                            {activeVehicle.isCovered
                              ? "Covered"
                              : "Not covered"}
                          </motion.p>
                        </div>
                        <motion.div
                          layoutId={`vehicle-covered-indicator-${activeVehicle.id}`}
                          className={
                            activeVehicle.isCovered
                              ? "indicator active"
                              : "indicator"
                          }
                        />
                      </div>
                      <motion.div
                        className="sub-content"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { delay: 0.1, duration: 0.2 },
                        }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <div className="content-pairing-wrap">
                          <h6>Garaging Address</h6>
                          <p>{activeVehicle.address}</p>
                        </div>
                        <div className="content-pairing-wrap">
                          <h6>License Plate</h6>
                          <p>{activeVehicle.plate}</p>
                        </div>
                        <button>Update</button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : null}
          </AnimatePresence>
          <div className="list">
            {VEHICLES.map((vehicle) => (
              <motion.li
                className="vehicle-li"
                layoutId={`vehicle-container-${vehicle.id}`}
                onClick={() => setActiveVehicle(vehicle)}
                key={vehicle.id}
              >
                <motion.img
                  src={vehicle.image}
                  layoutId={`vehicle-image-${vehicle.id}`}
                />
                <div className="content">
                  <div className="text-content">
                    <motion.h2 layoutId={`vehicle-title-${vehicle.id}`}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </motion.h2>
                    <motion.p layoutId={`vehicle-covered-${vehicle.id}`}>
                      {vehicle.isCovered ? "Covered" : "Not covered"}
                    </motion.p>
                  </div>
                  <motion.div
                    layoutId={`vehicle-covered-indicator-${vehicle.id}`}
                    className={
                      vehicle.isCovered ? "indicator active" : "indicator"
                    }
                  />
                </div>
              </motion.li>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

const VEHICLES = [
  {
    id: 1,
    image: imgOdyssey,
    year: 2022,
    make: "Honda",
    model: "Odyssey",
    plate: "206 SOL",
    address: "202 E Grand Ave.",
    isCovered: true,
  },
  {
    id: 2,
    image: imgCivic,
    year: 2021,
    make: "Honda",
    model: "Civic",
    plate: "128 DEW",
    address: "206 N Floral St.",
    isCovered: false,
  },
  {
    id: 3,
    image: imgHighlander,
    year: 2019,
    make: "Toyota",
    model: "Highlander",
    plate: "101 BUN",
    address: "300 S Wheatridge Rd.",
    isCovered: true,
  },
  {
    id: 4,
    image: imgWrx,
    year: 2019,
    make: "Subaru",
    model: "WRX STI",
    plate: "397 KIQ",
    address: "901 S Lincoln St.",
    isCovered: true,
  },
  {
    id: 5,
    image: imgChallenger,
    year: 2021,
    make: "Dodge",
    model: "Challenger",
    plate: "145 YIT",
    address: "207 E Grand Ave.",
    isCovered: false,
  },
];
