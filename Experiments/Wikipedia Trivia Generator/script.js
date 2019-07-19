// regex to find dates
//    /\b[1-2]\d{3}\b/gm

const inputMin = document.getElementById('min');
const inputMax = document.getElementById('max');
const submitBtn = document.querySelector('button[type=submit]');
const resultsSection = document.getElementById('results');
const selectDates = /\b[1-2]\d{3}\b/gm;

const dates = '1234-5968-2348593-2111-123-54389';
console.log(dates.match(selectDates));

submitBtn.addEventListener('click', () => generateClues());

function generateClues() {
  const yearMin = parseInt(inputMin.value);
  const yearMax = parseInt(inputMax.value);

  function calcRandomYear() {
    const numOfYearsInRange = yearMax - yearMin;
    const randomYr = Math.floor(Math.random() * numOfYearsInRange);
    return (randomYr + yearMin).toString();
  }

  const randomYear = calcRandomYear();
  console.log(randomYear);

  function displayResults(res) {
    resultsSection.innerHTML = res;
  }

  //////////////////////////////////////////////
  // Get clues from Wikipedia ↓
  //////////////////////////////////////////////

  if (randomYear === 'NaN' || randomYear < 1) {
    resultsSection.innerHTML = `
      <h1>Please enter a date range.</h1>
      <p>For example, entering 1700 - 1950 will give you a set of events that all occured on a single year within that range.</p>
    `;
  } else {
    wtf.fetch(randomYear).then(doc => {
      const collections = [];

      // Categorize Events
      doc.sections().forEach((section, i) => {
        if (section.depth === 0) {
          // Create a new event category (events, births, deaths, etc.)
          // that will contain events.
          collections.push({ [section._title]: [] });
        } else {
          // Select the latest event object and add the current event to it.
          const lastInArray = collections[collections.length - 1];
          const sectionEventsArr = lastInArray[Object.keys(lastInArray)[0]];

          section.lists().forEach(items => {
            items.data.forEach(item => {
              const line = item.text();
              // Remove cases where a date is on a line by itself.
              if (line.length > 15) return sectionEventsArr.push(line);
            });
          });
        }
      });

      // Remove empty categories
      const filteredCollections = collections.filter(collection => {
        return Object.values(collection)[0].length > 0;
      });

      const mainEvents = Object.values(filteredCollections[0])[0];

      // Put it all together in a single array
      let allEvents = [];
      filteredCollections.forEach(list => {
        const eventType = Object.keys(list)[0]; // events, births, deaths
        const events = Object.values(list)[0];
        allEvents.push(...events.map(event => `${eventType}: ${event}`));
      });

      const clues = [];
      const totalClueCount = 5;
      const minNumOfmainEvents = 2;

      new Array(totalClueCount).fill(0).forEach((clue, i) => {
        if (i <= minNumOfmainEvents - 1) {
          const randomNumInMainEvents = Math.floor(Math.random() * mainEvents.length);
          clues.push(mainEvents[randomNumInMainEvents]);
        } else {
          const randomNumInRange = Math.floor(Math.random() * allEvents.length);
          clues.push(allEvents[randomNumInRange]);
        }
      });

      const generateHtml = clues
        .map(clue => {
          // console.log(clue);
          return `<li>${clue}</li>`;
        })
        .join('');

      displayResults(generateHtml);
    });
  }
}
