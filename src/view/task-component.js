import { AbstractComponent } from "../framework/view/abstract-component.js";

const createTaskTemplate = (text, taskClass) => `
  <li class="task-${taskClass}">${text}</li>
`;

export default class TaskComponent extends AbstractComponent {
  constructor(text, taskClass) {
    super();
    this.text = text;
    this.taskClass = taskClass;
  }

  get template() {
    return createTaskTemplate(this.text, this.taskClass);
  }
}
