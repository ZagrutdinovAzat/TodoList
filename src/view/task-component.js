import { createElement } from "../framework/render.js";

const createTaskTemplate = (text, taskClass) => `
  <li class="task-${taskClass}">${text}</li>
`;

export default class TaskComponent {
  constructor(text, taskClass) {
    this.text = text;
    this.taskClass = taskClass;
  }

  getTemplate() {
    return createTaskTemplate(this.text, this.taskClass);
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
