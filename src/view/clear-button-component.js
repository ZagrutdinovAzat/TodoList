import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
  return `
        <button class="button-clear">Очистить</button>
        `;
}

export default class ClearButtonTemplate extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("click", this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

  get template() {
    return createClearButtonTemplate();
  }
}
