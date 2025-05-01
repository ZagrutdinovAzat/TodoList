import Observable from "../framework/observable.js";
import { generateID } from "../utils.js";
import { UpdateType, UserActions } from "../const.js";

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardtasks = null;

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;

    this.#tasksApiService.tasks.then((tasks) => {});
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTaskByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  async addTask(title) {
    const newTask = {
      id: generateID(),
      title: title,
      status: "backlog",
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserActions.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error("Ошибка при добавлении задачи на сервер:", err);
      throw err;
    }
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
    this._notify(UserActions.DELETE_TASK, { id: taskId });
  }

  async removeTrash() {
    const trashTasks = this.#boardtasks.filter(
      (task) => task.status === "trash"
    );

    try {
      await Promise.all(
        trashTasks.map((task) => this.#tasksApiService.deleteTask(task.id))
      );
      this.#boardtasks = this.#boardtasks.filter(
        (task) => task.status !== "trash"
      );
      this._notify(UserActions.DELETE_TASK, { status: "trash" });
    } catch (err) {
      console.error("Ошибка при удалении задач из корхины на серввере:", err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, newIndex = null) {
    const taskIndex = this.#boardtasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const originalStatus = this.#boardtasks[taskIndex].status;
    const originalTask = this.#boardtasks[taskIndex];
    const [task] = this.#boardtasks.splice(taskIndex, 1);

    try {
      task.status = newStatus;

      if (newIndex === null) {
        this.#boardtasks.push(task);
      } else {
        const tasksInStatus = this.#boardtasks.filter(
          (t) => t.status === newStatus
        );
        const statusIndexes = tasksInStatus.map((t) =>
          this.#boardtasks.indexOf(t)
        );
        const insertIndex = statusIndexes[newIndex] ?? this.#boardtasks.length;
        this.#boardtasks.splice(insertIndex, 0, task);
      }

      const updatedTask = await this.#tasksApiService.updateTask(task);
      Object.assign(task, updatedTask);
      this._notify(UserActions.UPDATE_TASK, task);
    } catch (err) {
      console.error("Ошибка при обновлении задачи:", err);

      const rollbackIndex = this.#boardtasks.findIndex((t) => t.id === taskId);
      if (rollbackIndex !== -1) this.#boardtasks.splice(rollbackIndex, 1);

      task.status = originalStatus;
      this.#boardtasks.splice(taskIndex, 0, originalTask);

      throw err;
    }
  }
}
