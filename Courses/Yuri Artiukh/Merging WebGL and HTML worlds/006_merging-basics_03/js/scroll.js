const lerp = (start, end, alpha) => (1 - alpha) * start + alpha * end;

export default class Scroll {
  constructor() {
    this.DOM = { main: document.querySelector('main')};
  }
}