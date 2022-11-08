import Head from "next/head";
import Link from "next/link";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "./nav";
import { Fragment, useState } from "react";
import VerseView from "./verse-view";
import { motion, MotionConfig } from "framer-motion";

const transition = {
  type: "spring",
  damping: 28,
  stiffness: 300,
};

const animationConfig = {
  visible: { y: 0, transition },
  notVisible: { y: "-100%", transition },
};

export default function Menu({
  data,
  isMenuVisible,
  setSelectedVerse,
  setIsMenuVisible,
}) {
  const day = dayOfTheWeek();

  const handleSelect = (verse) => {
    setSelectedVerse(verse);
    setIsMenuVisible(false);
  };

  return (
    <motion.div
      animate={isMenuVisible ? "visible" : "notVisible"}
      variants={animationConfig}
      className={"menu"}
    >
      {/* <h2 className={"menu-header"}>All verses</h2> */}
      <h2 className={"menu-header"}>{day}</h2>
      <ol className={"menu-ol"}>
        {data.map(({ id, reference, verse }) => {
          return (
            <li
              key={id}
              onClick={() => handleSelect(verse)}
              className={"menu-li"}
            >
              <h3 className="menu-verse-heading">{reference}</h3>
              <p className="menu-verse-body">
                {verse[0].paragraph.rich_text[0].plain_text}
              </p>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

const dayOfTheWeek = () => {
  const options = { weekday: "long" };
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", options).format(now);
};
