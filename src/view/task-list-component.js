import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

const createTaskListTemplate = (title, labelClass) => `
  <div class="column-tasks">
    <h3 class="label-${labelClass}">${title}</h3>
    <ul class="ul-no-markers"></ul>
  </div>
`;

export default class TaskListComponent extends AbstractComponent {
  constructor(title, labelClass, onTaskDrop) {
    super();
    this.label = title;
    this.status = labelClass;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListTemplate(this.label, this.status);
  }

  #setDropHandler(onTaskDrop) {
    const listContainer = this.element.querySelector(".ul-no-markers");

    listContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
      const afterElement = this.#getDragAfterElement(
        listContainer,
        event.clientY
      );
      const dragging = document.querySelector(".dragging");
      if (afterElement == null) {
        listContainer.appendChild(dragging);
      } else {
        listContainer.insertBefore(dragging, afterElement);
      }
    });

    listContainer.addEventListener("drop", (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text/plain");
      const afterElement = this.#getDragAfterElement(
        listContainer,
        event.clientY
      );
      const children = [...listContainer.children];
      const newIndex = afterElement
        ? children.indexOf(afterElement)
        : children.length;
      onTaskDrop(taskId, this.status, newIndex);
    });
  }

  #getDragAfterElement(container, y) {
    const elements = [...container.querySelectorAll("li:not(.dragging)")];

    return elements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
}
