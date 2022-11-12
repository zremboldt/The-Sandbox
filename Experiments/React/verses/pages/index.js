import Head from "next/head";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "../components/nav";
import { useState } from "react";
import VerseView from "../components/verse-view";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ data }) {
  const [selectedVerse, setSelectedVerse] = useState(null);

  return (
    <div>
      <Head>
        <title>Word</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav setSelectedVerse={setSelectedVerse} data={data} />
      <VerseView selectedVerse={selectedVerse} />
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  const request = database.map(({ id }) => getBlocks(id));

  const verses = await Promise.all(request).then((response) => response);

  const transformedData = verses.map((verse, i) => {
    const db = database[i];
    const tags = db.properties.Tags.multi_select.map(({ name }) => name);

    const mappedVerse = verse.map((block) => {
      if (block.type === "paragraph") {
        const paragraph = block.paragraph.rich_text.map(({ plain_text }) => {
          return plain_text;
        });

        if (paragraph.length) {
          return paragraph[0];
        }
      }

      console.log(
        `❌ Unsupported block (${
          block.type === "unsupported"
            ? "unsupported by Notion API"
            : block.type
        })`
      );
      return "";
    });

    return {
      verse: mappedVerse,
      id: db.id,
      reference: db.properties.Name.title[0].plain_text,
      tags,
    };
  });

  return {
    props: { data: transformedData },
    revalidate: 1,
  };
};
