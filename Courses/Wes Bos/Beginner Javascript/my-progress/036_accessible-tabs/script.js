const container = document.querySelector('.container');
const tabs = container.querySelectorAll('[role="tab"]');
const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(e) {
  // hide all panels
  panels.forEach(panel => panel.hidden = true);
  // mark all tabs aria-selected as false
  tabs.forEach(tab => tab.setAttribute('aria-selected', false));
  // mark clicked tab as selected
  e.currentTarget.setAttribute('aria-selected', true);
  // find associated panel and show it
  const id = e.currentTarget.id;
  const associatedPanel = panels.find(panel => panel.getAttribute('aria-labelledby') === id);
  associatedPanel.hidden = false;
};

tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

