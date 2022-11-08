import Head from "next/head";
import Link from "next/link";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "../components/nav";
import { Fragment, useState } from "react";
import VerseView from "../components/verse-view";
import { motion, MotionConfig } from "framer-motion";

export const databaseId = process.env.NOTION_DATABASE_ID;

const transition = {
  type: "spring",
  damping: 28,
  stiffness: 300,
};

const animationConfig = {
  visible: { y: 0, transition },
  notVisible: { y: "-100%", transition },
};

export default function Home({ data }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState(null);
  console.log(data);

  const day = dayOfTheWeek();

  const handleSelect = (verse) => {
    setSelectedVerse(verse);
    setIsMenuVisible(false);
  };

  return (
    <div>
      <Head>
        <title>Word App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />

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

      <VerseView blocks={selectedVerse} />
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  const request = database.map(({ id }) => getBlocks(id));

  const verse = await Promise.all(request).then((response) => response);

  const transformedData = verse.map((verse, i) => {
    const db = database[i];

    return {
      verse,
      id: db.id,
      reference: db.properties.Name.title[0].plain_text,
    };
  });

  return {
    props: { data: transformedData },
    revalidate: 1,
  };
};

const dayOfTheWeek = () => {
  const options = { weekday: "long" };
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", options).format(now);
};
