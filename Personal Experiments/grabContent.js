// Wrote this script to grab all of the text I wanted out of a page.
// https://www.hustlerturf.com/about/why-hustler

function grabContent() {
  const body = document.body;

  const headlines = Array.from(document.querySelectorAll(".feature-thumb-title"))
    .filter(item => item.classList.contains("rm-m"))
    .map(item => item.textContent);

  const text = Array.from(document.querySelectorAll(".feature-thumb-text")).map(item =>
    item.textContent.trim()
  );

  body.innerHTML = "";

  headlines.forEach((h, i) => {
    body.innerHTML += `
      <h2>${h}</h2>
      <p>${text[i]}</p>
      `;
  });
}

grabContent();
