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

      <main className={"container"}>
        <h2 className={styles.heading}>All verses</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const [title] = post.properties.Name.title;

            // const date = new Date(post.last_edited_time).toLocaleString(
            //   "en-US",
            //   {
            //     month: "short",
            //     day: "2-digit",
            //     year: "numeric",
            //   }
            // );

            return (
              <Fragment key={post.id}>
                <li className={styles.listItem}>
                  <Link href={`/${post.id}`}>{title.plain_text}</Link>
                </li>
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
