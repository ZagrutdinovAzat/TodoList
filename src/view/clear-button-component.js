import { AbstractComponent } from "../framework/view/abstract-component.js";

function createClearButtonTemplate() {
  return `
        <button class="button-clear">Очистить</button>
        `;
}

export default class ClearButtonTemplate extends AbstractComponent {
  get template() {
    return createClearButtonTemplate();
  }
}
