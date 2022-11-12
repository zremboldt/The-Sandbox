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
              {tags[0] && (
                <span className="menu-verse-tag" style={getTagColor(tags[0])}>
                  {tags[0]}
                </span>
              )}
              <h3 className="menu-verse-heading">{reference}</h3>
              <p className="menu-verse-body">{verse[0]}</p>
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

const getTagColor = (tag) => {
  const colors = {
    indigo: "hsla(257, 100%, 70%, 1)",
    pink: "hsla(322, 100%, 68%, 1)",
    green: "hsla(160, 100%, 48%, 1)",
    blue: "hsla(194, 100%, 50%, 1)",
    yellow: "hsla(47, 100%, 50%, 1)",
    red: "hsla(16, 100%, 50%, 1)",
  };

  const tagToColorMap = {
    Inheritance: {
      border: `1px solid ${colors.indigo}`,
      color: colors.indigo,
    },
    "Joy of the Lord": {
      border: `1px solid ${colors.green}`,
      color: colors.green,
    },
    "Seeking Him": {
      border: `1px solid ${colors.pink}`,
      color: colors.pink,
    },
    "Love of God": {
      border: `1px solid ${colors.blue}`,
      color: colors.blue,
    },
    "Awe of God": {
      border: `1px solid ${colors.yellow}`,
      color: colors.yellow,
    },
  };

  return tagToColorMap[tag];
};

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
    Wednesday: "Love of God",
    Thursday: "Inheritance",
    Friday: "Joy of the Lord",
    Saturday: "Awe of God",
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
