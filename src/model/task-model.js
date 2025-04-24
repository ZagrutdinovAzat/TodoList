import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TaskModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTaskByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateID(),
      title: title,
      status: "backlog",
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  removeTrash() {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== "trash"
    );
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }


  updateTaskStatus(taskId, newStatus, newIndex = null) {
    const taskIndex = this.#boardtasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    const [task] = this.#boardtasks.splice(taskIndex, 1);
    task.status = newStatus;

    if (newIndex === null) {
      this.#boardtasks.push(task);
    } else {
      const tasksInStatus = this.#boardtasks.filter(
        (task) => task.status === newStatus
      );
      const statusIndexes = tasksInStatus.map((task) =>
        this.#boardtasks.indexOf(task)
      );

      const insertIndex = statusIndexes[newIndex] ?? this.#boardtasks.length;
      this.#boardtasks.splice(insertIndex, 0, task);
    }

    this._notifyObservers();
  }
}
