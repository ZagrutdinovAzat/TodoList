import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

const createTaskListTemplate = (title, labelClass) => `
  <div class="column-tasks">
    <h3 class="${labelClass}">${title}</h3>
    <ul class="ul-no-markers"></ul>
  </div>
`;

export default class TaskListComponent extends AbstractComponent {
  constructor(title, labelClass) {
    super();
    this.title = title;
    this.labelClass = labelClass;
  }

  get template() {
    return createTaskListTemplate(this.title, this.labelClass);
  }
}
