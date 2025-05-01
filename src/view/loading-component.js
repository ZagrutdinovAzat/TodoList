import { AbstractComponent } from "../framework/view/abstract-component.js";

function createLoadingTemplate() {
  return '<p class="board_no-tasks">Loading...</p>';
}

export default class LoadingComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createLoadingTemplate();
  }
}
