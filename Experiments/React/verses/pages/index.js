import Head from "next/head";
import Link from "next/link";
import { getDatabase, getBlocks } from "../lib/notion";
import Nav from "../components/nav";
import { Fragment, useState } from "react";
import VerseView from "../components/verse-view";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ data }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [selectedVerse, setSelectedVerse] = useState(null);
  console.log(data);

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

      {isMenuVisible && (
        <main className={"list-container"}>
          <h2 className={"listHeader"}>All verses</h2>
          <ol className={"verses-ol"}>
            {data.map(({ id, reference, verse }) => {
              // const date = new Date(post.last_edited_time).toLocaleString(
              //   "en-US",
              //   {
              //     month: "short",
              //     day: "2-digit",
              //     year: "numeric",
              //   }
              // );

              return (
                <Fragment key={id}>
                  <li
                    onClick={() => handleSelect(verse)}
                    className={"verses-li"}
                  >
                    {reference}
                  </li>
                </Fragment>
              );
            })}
          </ol>
        </main>
      )}

      {selectedVerse && <VerseView blocks={selectedVerse} />}
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
