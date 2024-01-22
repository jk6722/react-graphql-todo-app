const todosModel = require("./todos.model");

module.exports = {
  Query: {
    allTodos: () => todosModel.getAllTodos(),
  },
  Mutation: {
    createTodo: (_, args) => todosModel.addNewTodo(args.text, args.checked),
    updateTodo: (_, args) =>
      todosModel.updateTodo(args.text, args.checked, args.id),
    removeTodo: (_, args) => todosModel.removeTodo(args.id),
  },
};
