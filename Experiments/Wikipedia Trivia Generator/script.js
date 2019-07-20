const desiredClueCount = 5; // How many clues do you want?
const desiredMainEvents = 2; // Minimum number of main events to be included. (i.e. not births, deaths, etc.)

const resultsSection = document.getElementById('results');
const inputMin = document.getElementById('min');
const inputMax = document.getElementById('max');
const submitBtn = document.querySelector('button[type=submit]');
const ctrRevealAnswer = document.getElementById('ctrRevealAnswer');
const selectDates = /\b[1-2]\d{3}\b/gm; // Regex that selects 4 digit numbers starting with 1 or 2.

submitBtn.addEventListener('click', () => generateClues());

const generateClues = () => {
  const yearMin = parseInt(inputMin.value);
  const yearMax = parseInt(inputMax.value);

  const calcRandomYear = () => {
    const numOfYearsInRange = Math.abs(yearMax - yearMin); // Math.abs() is great because no matter which num is larger, it returns the same positive number.
    console.log(numOfYearsInRange);
    const randomYr = Math.floor(Math.random() * numOfYearsInRange);
    if (yearMin < yearMax) return (randomYr + yearMin).toString(); // These take into account that someone may put the greater number in the wrong input.
    if (yearMin >= yearMax) return (randomYr + yearMax).toString();
  };

  const randomYear = calcRandomYear();
  console.log(randomYear);

  const displayResults = res => {
    resultsSection.innerHTML = res;
    // Create a reveal answer button
    ctrRevealAnswer.innerHTML = '<button id="revealAnswerBtn">Reveal Answer</button>';
    const revealAnswerBtn = document.getElementById('revealAnswerBtn');
    revealAnswerBtn.addEventListener('click', function() {
      this.innerHTML = randomYear;
    });
  };

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
      doc.sections().forEach(section => {
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

      // This solves a problem where certain years (i.e. 1196) were coming back
      // without any data. If that happens this line will start over and try again.
      if (filteredCollections.length === 0) generateClues();

      const mainEvents = Object.values(filteredCollections[0])[0];

      // Put it all together in a single array
      let allEvents = [];
      filteredCollections.forEach(list => {
        const eventType = Object.keys(list)[0]; // events, births, deaths
        const events = Object.values(list)[0];
        const eventTypeSingular = eventType.slice(0, -1);

        const formatClues = events.map(event => {
          const labelEventType = `<span class="eventType">-- ${eventTypeSingular} --</span> ${event}`;
          const hideDates = labelEventType.replace(selectDates, '[DATE_HIDDEN]');
          return hideDates;
        });
        allEvents.push(...formatClues);
      });

      // Returns an array of unique random numbers.
      const randomNums = () => {
        let nums = [];

        const pickRandomNums = numberOfEvents => {
          const random = Math.floor(Math.random() * numberOfEvents);
          if (nums.indexOf(random) === -1) nums.push(random); // The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
        };

        if (allEvents.length < desiredClueCount + desiredMainEvents) {
          while (nums.length < allEvents.length) pickRandomNums(allEvents.length);
        } else {
          while (nums.length < desiredMainEvents) pickRandomNums(mainEvents.length);
          while (nums.length < desiredClueCount) pickRandomNums(allEvents.length);
        }
        return nums;
      };

      const clues = [];
      randomNums().forEach(num => clues.push(allEvents[num]));

      const generateHtml = clues.map(clue => `<li>${clue}</li>`).join('');

      displayResults(generateHtml);
    });
  }
};
