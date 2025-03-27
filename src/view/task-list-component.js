import { createElement } from "../framework/render.js";

const createTaskListTemplate = (title, labelClass) => `
  <div class="column-tasks">
    <h3 class="${labelClass}">${title}</h3>
    <ul class="ul-no-markers"></ul>
  </div>
`;

export default class TaskListComponent {
  constructor(title, labelClass) {
    this.title = title;
    this.labelClass = labelClass;
  }

  getTemplate() {
    return createTaskListTemplate(this.title, this.labelClass);
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
