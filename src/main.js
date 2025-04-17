import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";
import { render, RenderPosition } from "./framework/render.js";
import TaskBoardPresenter from "./presenter/tasks-board-presenter.js";
import TaskModel from "./model/task-model.js";
import ClearButtonTemplate from "./view/clear-button-component.js";

const bodyContainer = document.querySelector("body");
const formContainer = document.querySelector(".section-new-task");
const taskBoardContainer = document.querySelector(".section-tasks");
const clearButton = new ClearButtonTemplate({ onClick: handleRemoveTrash });

const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: taskBoardContainer,
  taskModel,
  clearButton: clearButton,
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick,
});

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}

function handleRemoveTrash() {
  taskBoardPresenter.removeTrash();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, formContainer);

taskBoardPresenter.init();
