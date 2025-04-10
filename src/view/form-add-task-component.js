import { AbstractComponent } from "../framework/view/abstract-component.js";

const createFormTemplate = () => `
  <form class="section-new-task">
    <h2>Новая задача</h2>
    <div>
      <input type="text" placeholder="Название задачи..." />
      <button>+ Добавить</button>
    </div>
  </form>
`;

export default class FormAddTaskComponent extends AbstractComponent {
  get template() {
    return createFormTemplate();
  }
}
