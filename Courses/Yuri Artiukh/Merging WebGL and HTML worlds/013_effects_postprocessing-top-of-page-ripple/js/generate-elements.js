import img0 from "url:../images/img0.jpg";
import img1 from "url:../images/img1.jpg";
import img2 from "url:../images/img2.jpg";
import img3 from "url:../images/img3.jpg";
import img4 from "url:../images/img4.jpg";
import img5 from "url:../images/img5.jpg";
import img6 from "url:../images/img6.jpg";
import img7 from "url:../images/img7.jpg";
import img8 from "url:../images/img8.jpg";
import img9 from "url:../images/img9.jpg";

const data = [
  {
    img: img0,
    date: '3121 / Sol 36',
    headline: 'Ares 3 launch',
    body: 'If the oxygenator breaks down, I’ll suffocate. If the water reclaimer breaks down, I’ll die of thirst. If the Hab breaches, I’ll just kind of explode. If none of those things happen, I’ll eventually run out of food and starve to death. So yeah. I’m toast.'
  },
  {
    img: img6,
    date: '3120 / Sol 135',
    headline: 'Expedition on Innis Prime',
    body: `I didn’t want to distract the people who were saving my life, so I muted my mic and screamed like a little girl. It’s true, you know. In space, no one can hear you scream like a little girl.`
  },
  {
    img: img2,
    date: '3120 / Sol 358',
    headline: 'Schiaparelli Crater',
    body: "One thing I have in abundance here are bags. They're not much different than kitchen trash bags, though I'm sure they cost $50,000 because of NASA."
  },
  {
    img: img3,
    date: '3120 / Sol 306',
    headline: 'Survey at Perseus',
    body: "Yes, of course duct tape works in a near-vacuum. Duct tape works anywhere. Duct tape is magic and should be worshiped."
  },
  {
    img: img4,
    date: '3120 / Sol 287',
    headline: 'Outpost at Acidalia Planitia',
    body: `The screen went black before I was out of the airlock. Turns out the “L” in “LCD” stands for “Liquid.” I guess it either froze or boiled off. Maybe I’ll post a consumer review. “Brought product to surface of Mars. It stopped working. 0/10.”`
  },
  {
    img: img5,
    date: '3120 / Sol 203',
    headline: 'Vast mineral fields on Calypso’s third moon',
    body: `But in the end, if everything goes to plan, I’ll have 92 square meters of crop-able soil. Heck yeah I’m a botanist! Fear my botany powers!`
  },
  {
    img: img1,
    date: '3121 / Sol 4',
    headline: 'Unusual seismic activity recorded on Nova Cataluna',
    body: 'Also, I have duct tape. Ordinary duct tape, like you buy at a hardware store. Turns out even NASA can’t improve on duct tape.'
  },
  {
    img: img7,
    date: '3119 / Sol 363',
    headline: 'Ares 2 landing site',
    body: `The battery was a lithium thionyl chloride non-rechargeable. I figured that out from some subtle clues: the shape of the connection points, the thickness of the insulation, and the fact that it had “LiSOCl2 NON-RCHRG” written on it.`
  },
  {
    img: img8,
    date: '3119 / Sol 280',
    headline: 'Jezero Crater survey',
    body: `I'll need to trick out a rover. Basically it'll have to be a mobile Hab. I'll pick Rover 2 as my target. We have a certain bond, after I spent two days in it during the Great Hydrogen Scare of Sol 37.`
  },
  {
    img: img9,
    date: '3119 / Sol 196',
    headline: 'Olympus Mons',
    body: `I can't wait till I have grandchildren. When I was younger, I had to walk to the rim of a crater. Uphill! In an EVA suit! On Mars, ya little punk! Ya hear me? Mars!`
  },
]

function generateArticle({
  img,
  date,
  headline,
  body,
}) {
  return `
    <article>
      <div class="container_article-start">
        <div class="image-container">
          <img class="article-image" src="${img}" alt="${headline}">
        </div>
        <span class="date font-mono">${date}</span>
      </div>
      <div class="text-container">
        <h2>${headline}</h2>
        <p>${body}</p>
      </div>
    </article>
  `
}

const articleMarkup = data.map(article => generateArticle(article)).join('');

const containerArticlesEl = document.querySelector('.container_articles');

containerArticlesEl.insertAdjacentHTML('afterbegin', articleMarkup);