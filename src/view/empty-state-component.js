import { AbstractComponent } from "../framework/view/abstract-component.js";

function getEmptyStateTemplate() {
  return '<div class="empty-state" >Перетащите карточку</div>';
}

export default class EmptyStateComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return getEmptyStateTemplate();
  }
}
