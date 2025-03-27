import { createElement } from "../framework/render.js";

const createFormTemplate = () => `
  <form class="section-new-task">
    <h2>Новая задача</h2>
    <div>
      <input type="text" placeholder="Название задачи..." />
      <button>+ Добавить</button>
    </div>
  </form>
`;

export default class FormAddTaskComponent {
  getTemplate() {
    return createFormTemplate();
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
