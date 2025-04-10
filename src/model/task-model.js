import { tasks } from "../mock/task.js";

export default class TaskModel {
  #boardtasks = tasks;

  get tasks() {
    return this.#boardtasks;
  }
}
