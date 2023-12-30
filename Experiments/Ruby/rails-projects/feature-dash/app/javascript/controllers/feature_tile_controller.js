import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="feature-tile"
export default class extends Controller {
  connect() { console.log("Feature-tile-controller connected"); }

  static targets = ["target"];

  toggleDetailsVisible(event) {
    if (event.target.classList.contains("button")) { return; } // Ignore button clicks
    
    this.targetTarget.classList.toggle('active');
  }
}
