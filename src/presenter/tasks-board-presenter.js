import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import { StatusLabel, TaskClass } from "../const.js";
import ClearButtonTemplate from "../view/clear-button-component.js";
import EmptyStateComponent from "../view/empty-state-component.js";

export default class TaskBoardPresenter {
  #taskBoardComponent = new TaskBoardComponent();
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #clearButton = null;

  createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }

    this.#taskModel.addTask(taskTitle);

    document.querySelector("#add-task").value = "";
  }

  constructor({ boardContainer, taskModel, clearButton }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#clearButton = clearButton;
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
  }

  removeTrash() {
    this.#taskModel.removeTrash();
    this.#renderBoard;
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  get tasks() {
    return this.#taskModel.tasks;
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = "";
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task.title, task.status);
    render(taskComponent, container.querySelector(".ul-no-markers"));
  }

  #renderClearButton(container) {
    render(this.#clearButton, container);
  }

  #renderEmptyState(container) {
    render(new EmptyStateComponent(), container);
  }

  #renderTasksList(status, tasks) {
    const title = StatusLabel[status];
    const labelClass = TaskClass[status];
    const taskListComponent = new TaskListComponent(title, labelClass);
    const listContainer =
      taskListComponent.element.querySelector(".ul-no-markers");

    if (tasks.length === 0) {
      this.#renderEmptyState(listContainer);
    } else {
      tasks.forEach((task) => {
        this.#renderTask(task, taskListComponent.element);
      });
    }

    render(taskListComponent, this.#taskBoardComponent.element);
    return taskListComponent;
  }

  #renderBoard() {
    this.#boardTasks = [...this.tasks];
    render(this.#taskBoardComponent, this.#boardContainer);

    const taskGroups = this.#boardTasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    const allStatuses = Object.keys(StatusLabel);
    const taskListComponents = allStatuses.map((status) => {
      const tasks = taskGroups[status] || [];
      return this.#renderTasksList(status, tasks);
    });

    if (taskListComponents.length > 0) {
      const lastComponent = taskListComponents.at(-1);
      this.#renderClearButton(lastComponent.element);
    }
  }

  init() {
    this.#renderBoard();
  }
}
