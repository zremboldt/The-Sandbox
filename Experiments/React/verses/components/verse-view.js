import { Fragment, useState } from "react";
import Head from "next/head";
import Link from "next/link";

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

export default function VerseView({ blocks }) {
  return (
    <main className="verse-wrap">
      <section className="verse-container">
        {!blocks ? (
          <h3>Select a verse to begin.</h3>
        ) : (
          blocks.map((block) => (
            <Fragment key={block.id}>{renderVerse(block)}</Fragment>
          ))
        )}
      </section>
    </main>
  );
}
