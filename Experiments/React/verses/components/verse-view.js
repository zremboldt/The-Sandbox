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
  // Look into this! 
  // `Intl.Segmenter` for spliting sentences by different levels of granularity.
  // https://twitter.com/stefanjudis/status/1596922615582830593?s=20&t=20W6JFITdW8FjOprl_j96A
  
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

export default function VerseView({ selectedVerse }) {
  const [shuffleNum, setShuffleNum] = useState(0);

  return (
    <main className="verse-wrap">
      <section className="verse-container">
        {selectedVerse &&
          selectedVerse.map((block, i) => (
            <div className={"verse"} key={i}>
              <Verse verse={block} density={3} shuffleNum={shuffleNum} />
            </div>
          ))}
          <div className="verse-button-bar">
            <Button
              onClick={() => setShuffleNum(shuffleNum + 1)}
              className={"verse-button-shuffle"}
            >
              <ShuffleIcon />
            </Button>
          </div>
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
