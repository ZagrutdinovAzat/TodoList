import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import TaskBoardComponent from "../view/task-board-component.js";
import { render } from "../framework/render.js";
import { StatusLabel, TaskClass, UserActions, UpdateType } from "../const.js";
import EmptyStateComponent from "../view/empty-state-component.js";
import LoadingComponent from "../view/loading-component.js";

export default class TaskBoardPresenter {
  #taskBoardComponent = new TaskBoardComponent();
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #clearButton = null;

  #isLoading = true;
  #loadingComponent = new LoadingComponent();

  constructor({ boardContainer, taskModel, clearButton }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#clearButton = clearButton;
    this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    try {
      this.#renderLoading();

      await this.#taskModel.init();
      this.#isLoading = false;

      this.#clearBoard();
      this.#renderBoard();
    } catch (err) {
      console.error("Ошибка загрузки данных:", err);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  #removeLoading() {
    this.#loadingComponent.element.remove();
  }

  async createTask() {
    const taskTitle = document.querySelector("#add-task").value.trim();
    if (!taskTitle) {
      return;
    }

    try {
      await this.#taskModel.addTask(taskTitle);
      document.querySelector("#add-task").value = "";
    } catch (err) {
      console.error("Ошибка при создании задачи:", err);
    }
  }

  async removeTrash() {
    try {
      await this.#taskModel.removeTrash();
    } catch (err) {
      console.error("Ошибка при очистке корзины", err);
    }
  }

  #handleModelEvent(event, payload) {
    switch (event) {
      case UserActions.ADD_TASK:
      case UserActions.UPDATE_TASK:
      case UserActions.DELETE_TASK:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  }

  get tasks() {
    return this.#taskModel.tasks;
  }

  #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = "";
    this.#removeLoading();
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container.querySelector(".ul-no-markers"));
  }

  #renderClearButton(container) {
    render(this.#clearButton, container);
  }

  #renderEmptyState(container) {
    render(new EmptyStateComponent(), container);
  }

  async #handleTaskDrop(taskId, newStatus, newIndex) {
    try {
      await this.#taskModel.updateTaskStatus(taskId, newStatus, newIndex - 1);
    } catch (err) {
      console.error("Ошибка при обновлении статуса");
    }
  }

  #renderTasksList(status, tasks) {
    const title = StatusLabel[status];
    const labelClass = TaskClass[status];
    const taskListComponent = new TaskListComponent(
      title,
      labelClass,
      this.#handleTaskDrop.bind(this)
    );
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
    if (this.#isLoading) return;
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
}
