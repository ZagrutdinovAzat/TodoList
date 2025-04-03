import { createElement } from "../framework/render.js";

function createClearButtonTemplate() {
  return `
        <button class="button-clear">Очистить</button>
        `;
}

export default class ClearButtonTemplate {
  getTemplate() {
    return createClearButtonTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
