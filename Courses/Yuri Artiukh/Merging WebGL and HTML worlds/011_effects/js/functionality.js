const aboutMessage = `TODO: Make this a real modal... maybe ¯\\_(ツ)_/¯
---

I created this page during Root's Q2 Hackdays, 2021 as a sandbox for mixing HTML and WebGL shaders.

Credits:
- Images were found on unsplash.com
- Mock text was sourced from Andy Weir's "The Martian".
`

const buttonAbout = document.querySelector('.button_about');

buttonAbout.addEventListener('keydown', (e) => (e.keyCode === 13 && alert(aboutMessage)));
buttonAbout.addEventListener('click', () => alert(aboutMessage));