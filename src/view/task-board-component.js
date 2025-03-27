import { createElement } from "../framework/render.js";

const createTaskBoardTemplate = () => `
  <section class="section-tasks"></section>
`;

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardTemplate();
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
