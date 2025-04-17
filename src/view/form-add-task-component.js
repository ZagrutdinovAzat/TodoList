import { AbstractComponent } from "../framework/view/abstract-component.js";

const createFormTemplate = () => `
  <form class="section-new-task">
    <h2>Новая задача</h2>
    <div>
      <input id="add-task" type="text" placeholder="Название задачи..." />
      <button>+ Добавить</button>
    </div>
  </form>
`;

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener("submit", this.#clickHandler);
  }

  get template() {
    return createFormTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
