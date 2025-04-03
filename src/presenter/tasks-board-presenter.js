import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import { StatusLabel, TaskClass } from "../const.js";
import ClearButtonTemplate from "../view/clear-button-component.js";

export default class TaskBoardPresenter {
  #taskBoardComponent = new TaskBoardComponent();

  #boardContainer = null;
  #taskModel = null;

  #boardTasks = [];

  constructor({ boardContainer, taskModel }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
  }

  init() {
    this.#boardTasks = [...this.#taskModel.getTasks()];

    render(this.#taskBoardComponent, this.#boardContainer);

    let currentStatus = "";
    let taskListComponent = null;

    for (let i = 0; i < this.#boardTasks.length; i++) {
      const currentTask = this.#boardTasks[i];
      if (currentTask.status != currentStatus) {
        currentStatus = currentTask.status;
        const title = StatusLabel[currentStatus];
        const labelClass = TaskClass[currentStatus];
        taskListComponent = new TaskListComponent(title, labelClass);
        render(taskListComponent, this.#taskBoardComponent.getElement());
      }
      render(
        new TaskComponent(currentTask.title, currentTask.status),
        taskListComponent.getElement().querySelector(".ul-no-markers")
      );
    }

    render(new ClearButtonTemplate(), taskListComponent.getElement());
  }
}
