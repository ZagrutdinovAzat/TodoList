import { AbstractComponent } from "../framework/view/abstract-component.js";

const createTaskBoardTemplate = () => `
  <section class="section-tasks"></section>
`;

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardTemplate();
  }
}
