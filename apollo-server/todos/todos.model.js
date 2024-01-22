const { randomUUID } = require("crypto");

let todos = [
  {
    id: "todo1",
    text: "밥먹기",
    checked: false,
  },
  {
    id: "todo2",
    text: "코딩하기",
    checked: false,
  },
];

const getAllTodos = () => {
  return todos;
};

const addNewTodo = (text, checked) => {
  const newTodo = {
    id: randomUUID(),
    text,
    checked,
  };
  todos.push(newTodo);
  return newTodo;
};

const updateTodo = (text, checked, id) =>
  todos
    .filter((todo) => todo.id === id)
    .map((todo) => {
      Object.assign(todo, { text, checked, id });
      return todo;
    })[0];

const removeTodo = (id) => {
  const removed = todos.filter((todo) => todo.id === id)[0];
  todos = todos.filter((todo) => todo.id !== id);
  return removed;
};

module.exports = {
  getAllTodos,
  addNewTodo,
  updateTodo,
  removeTodo,
};
