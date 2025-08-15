const radialMenuInfoItem = document.querySelector(
  '.radial-menu-container svg path.menu-item-path[data-id="info"]'
);

const allianceButton = document
  .querySelector('player-panel img[alt="Alliance"]')
  ?.closest("button");

allianceButton?.click();
