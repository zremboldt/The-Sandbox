import { Fragment, useState } from "react";
import ShuffleIcon from "./shuffle-icon";
import Button from "./squircle-button";

const Word = ({ children, initiallyVisible }) => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);

  return (
    <Fragment>
      <span
        className={!isVisible ? "verse-blank" : ""}
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

const renderVerse = (blocks) => {
  if (!blocks) {
    return <h3>Select a verse to begin.</h3>;
  }

  return (
    <>
      {blocks.map(({ type, paragraph, id }) => {
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
      })}
      <div className="verse-button-bar">
        <Button className={"verse-button-shuffle"}>
          <ShuffleIcon />
        </Button>
      </div>
    </>
  );
};

export default function VerseView({ blocks }) {
  return (
    <main className="verse-wrap">
      <section className="verse-container">{renderVerse(blocks)}</section>
      {/* <div className="verse-button-bar">
        <Button className={"verse-button-shuffle"}>
          <ShuffleIcon />
        </Button>
      </div> */}
    </main>
  );
}
