// Wrote this script to grab all of the content I wanted out of the feature sections on hustlerturf.com
// https://www.hustlerturf.com/products/x-one
// https://www.hustlerturf.com/about/why-hustler

(function grabContent() {
  const headlines = Array.from(document.querySelectorAll('.feature-thumb-title'))
    .filter(item => item.classList.contains('rm-m'))
    .map(item => item.textContent);

  const text = Array.from(document.querySelectorAll('.feature-thumb-text')).map(item =>
    item.textContent.trim()
  );

  const images = Array.from(document.querySelectorAll('.feature-thumb-image img'));

  document.body.innerHTML = '';

  headlines.forEach((h, i) => {
    document.body.innerHTML += `
      <h2>${h}</h2>
      <p>${text[i]}</p>
      ${images[i].outerHTML}
    `;
  });
})();
