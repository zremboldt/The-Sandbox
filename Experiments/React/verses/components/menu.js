import Head from "next/head";
import Link from "next/link";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "./nav";
import { Fragment, useState } from "react";
import VerseView from "./verse-view";
import { motion, MotionConfig } from "framer-motion";

export default function Menu({
  data,
  isMenuVisible,
  setSelectedVerse,
  setIsMenuVisible,
}) {
  const [isViewAllSelected, setIsViewAllSelected] = useState(false);
  const day = dayOfTheWeek();

  const selectedData = getSelectedData({ day, data, isViewAllSelected });

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
      <div className={"menu-header"}>
        <h3
          onClick={() => setIsViewAllSelected(true)}
          className={`menu-filter-button ${isViewAllSelected ? "active" : ""}`}
        >
          View all
        </h3>
        <div className="menu-filter-divider"></div>
        <h3
          onClick={() => setIsViewAllSelected(false)}
          className={`menu-filter-button ${!isViewAllSelected ? "active" : ""}`}
        >
          {day}
        </h3>
      </div>
      <ol className={"menu-ol"}>
        {selectedData.map(({ id, reference, verse, tags }) => {
          return (
            <li
              key={id}
              onClick={() => handleSelect(verse)}
              className={"menu-li"}
            >
              <span className="menu-verse-tag">{tags[0]}</span>
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

const getSelectedData = ({ day, data, isViewAllSelected }) => {
  const verseToDayMap = {
    Sunday: "Inheritance",
    Monday: "Joy of the Lord",
    Tuesday: "Seeking Him",
    Wednesday: "Inheritance",
    Thursday: "Love of God",
    Friday: "Joy of the Lord",
    Saturday: "Love of God",
  };

  if (isViewAllSelected) {
    return data;
  } else {
    const todaysTag = verseToDayMap[day];
    const todaysData = data.filter(({ tags }) => tags[0] === todaysTag);
    return todaysData;
  }
};

const transition = {
  type: "spring",
  damping: 28,
  stiffness: 300,
};

const animationConfig = {
  visible: { y: 0, transition },
  notVisible: { y: "-100%", transition },
};
