import Head from "next/head";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "../components/nav";
import { useState } from "react";
import VerseView from "../components/verse-view";
import Menu from "../components/menu";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ data }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState(null);

  const day = dayOfTheWeek();

  return (
    <div>
      <Head>
        <title>Word App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />

      <Menu
        setSelectedVerse={setSelectedVerse}
        data={data}
        setIsMenuVisible={setIsMenuVisible}
        isMenuVisible={isMenuVisible}
      />

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
