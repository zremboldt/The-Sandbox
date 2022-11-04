import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";
import Nav from "../components/nav";
import { Fragment } from "react";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Notion Next.js blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.container}>
        <h2 className={styles.heading}>All verses</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            // const date = new Date(post.last_edited_time).toLocaleString(
            //   "en-US",
            //   {
            //     month: "short",
            //     day: "2-digit",
            //     year: "numeric",
            //   }
            // );
            console.log(post);
            return (
              <Fragment key={post.id}>
                <ListItem title={post.properties.Name.title} id={post.id} />
              </Fragment>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};

const ListItem = ({ title, id }) => {
  const [item] = title;

  return (
    <li className={styles.post}>
      <Link href={`/${id}`}>{item.plain_text}</Link>
    </li>
  );
};
