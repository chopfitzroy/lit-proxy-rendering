import './style.css'

import { html } from 'lit-html';
import { createComponent } from './create-component';

const app = document.querySelector<HTMLDivElement>('#app');

const mountTodoList = createComponent<{
  todos: { title: string }[],
}>({
  name: 'todoList',
  data: {
    todos: [{
      title: 'Todo One'
    }],
  },
  render(props) {
    const list = props.todos.reduce((result, todo) => {
      return html`
        ${result}
        <li>${todo.title}</li>
      `;
    }, html``);
    
    setTimeout(() => {
      props.todos = [...props.todos, {
        title: 'Todo Two'
      }]
    }, 1000);

    return html`
        <ul>
          ${list}
        </ul>
      `
  }
});

mountTodoList(app);