import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskBoardComponent from "./view/task-board-component.js";
import TaskListComponent from "./view/task-list-component.js";
import TaskComponent from "./view/task-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector("body");
const mainContainer = document.createElement("main");
mainContainer.classList.add("main");
bodyContainer.appendChild(mainContainer);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), mainContainer);

const taskBoard = new TaskBoardComponent();
render(taskBoard, mainContainer);

const columns = [
  {
    title: "Бэклог",
    labelClass: "label-backlog",
    tasks: ["Выучить JS", "Выучить React", "Сделать домашку"],
    taskClass: "task-backlog",
  },
  {
    title: "В процессе",
    labelClass: "label-in-progress",
    tasks: ["Выпить смузи", "Попить воды"],
    taskClass: "task-in-progress",
  },
  {
    title: "Готово",
    labelClass: "label-done",
    tasks: ["Позвонить маме", "Погладить кота"],
    taskClass: "task-done",
  },
  {
    title: "Корзина",
    labelClass: "label-trash",
    tasks: ["Сходить погулять", "Прочитать Войну и Мир"],
    taskClass: "task-trash",
  },
];

columns.forEach((column) => {
  const taskList = new TaskListComponent(column.title, column.labelClass);
  render(taskList, taskBoard.getElement());

  const taskUl = taskList.getElement().querySelector("ul");
  column.tasks.forEach((taskText) => {
    render(new TaskComponent(taskText, column.taskClass), taskUl);
  });
});
