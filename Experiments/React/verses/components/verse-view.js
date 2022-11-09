import { Fragment, useEffect, useState } from "react";
import ShuffleIcon from "../assets/shuffle-icon";
import Button from "./squircle-button";

const Word = ({ children, blank }) => {
  const [isBlank, setIsBlank] = useState();

  useEffect(() => setIsBlank(blank), [blank]);

  return (
    <Fragment>
      <span
        className={`verse-word ${isBlank ? "verse-word-blank" : ""}`}
        onClick={() => setIsBlank(false)}
      >
        <span className="verse-word-front">{children}</span>
        <span className="verse-word-back"></span>
      </span>{" "}
    </Fragment>
  );
};

const Verse = ({ verse, density, shuffleNum }) => {
  const words = verse.split(" ");

  return words.map((word, i) => {
    let blank;

    if (randomAddSub(i, shuffleNum) % density === 0) {
      blank = true;
    } else {
      blank = false;
    }

    return (
      <Word blank={blank} key={i}>
        {word}
      </Word>
    );
  });
};

const VerseRenderer = ({ blocks }) => {
  const [shuffleNum, setShuffleNum] = useState(0);

  if (!blocks) {
    return <h3>Select a verse to begin.</h3>;
  }

  return (
    <>
      {blocks.map(({ type, paragraph, id }) => {
        if (paragraph?.rich_text) {
          return paragraph.rich_text.map(({ plain_text }, i) => (
            <div key={i} className={"verse"}>
              <Verse verse={plain_text} density={3} shuffleNum={shuffleNum} />
            </div>
          ));
        }

        return `❌ Unsupported block (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
      })}

      <div className="verse-button-bar">
        <Button
          onClick={() => setShuffleNum(shuffleNum + 1)}
          className={"verse-button-shuffle"}
        >
          <ShuffleIcon />
        </Button>
      </div>
    </>
  );
};

export default function VerseView({ blocks }) {
  return (
    <main className="verse-wrap">
      <section className="verse-container">
        <VerseRenderer blocks={blocks} />
      </section>
    </main>
  );
}

function randomAddSub(a, b) {
  if (Math.random() <= 0.5) {
    return a - b;
  } else {
    return a + b;
  }
}
