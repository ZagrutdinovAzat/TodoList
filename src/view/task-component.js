import { AbstractComponent } from "../framework/view/abstract-component.js";

const createTaskTemplate = (text, taskClass) => `
  <li class="task-${taskClass}">${text}</li>
`;

export default class TaskComponent extends AbstractComponent {
  constructor(task) {
    super();
    this.task = task;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskTemplate(this.task.title, this.task.status);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable() {
    this.element.setAttribute("draggable", true);
    this.element.addEventListener("dragstart", (event) => {
      this.element.classList.add("dragging");
      event.dataTransfer.setData("text/plain", this.task.id);
    });

    this.element.addEventListener("dragend", () => {
      this.element.classList.remove("dragging");
    });
  }
}
