import { Fragment, useState } from "react";
import Head from "next/head";
import { getDatabase, getPage, getBlocks } from "../lib/notion";
import Link from "next/link";
import { databaseId } from "./index.js";
import Nav from "../components/nav";

const Word = ({ children, initiallyVisible }) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  return (
    <Fragment>
      <span
        className={!isVisible ? "space" : ""}
        onClick={() => setIsVisible(true)}
      >
        {children}
      </span>{" "}
    </Fragment>
  );
};

const Verse = ({ verse, density }) => {
  const words = verse.split(" ");

  return words.map((word, i) => {
    if (i > 0 && i % density === 0) {
      return (
        <Word initiallyVisible={false} key={i}>
          {word}
        </Word>
      );
    }
    return (
      <Word initiallyVisible={true} key={i}>
        {word}
      </Word>
    );
  });
};

const renderVerse = ({ type, paragraph, id }) => {
  if (paragraph?.rich_text) {
    return paragraph.rich_text.map(({ plain_text }, i) => (
      <div key={i} className={"verse"}>
        <Verse verse={plain_text} density={3} />
      </div>
    ));
  }

  return `❌ Unsupported block (${
    type === "unsupported" ? "unsupported by Notion API" : type
  })`;
};

export default function Post({ page, blocks }) {
  if (!page || !blocks) {
    return <div />;
  }

  return (
    <div>
      <Head>
        <title>{page.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <section className="container">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderVerse(block)}</Fragment>
        ))}
      </section>
    </div>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({ params: { id: page.id } })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const page = await getPage(id);
  const blocks = await getBlocks(id);

  // Retrieve block children for nested blocks (one level deep), for example toggle blocks
  // https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      page,
      blocks: blocksWithChildren,
    },
    revalidate: 1,
  };
};
