import { ApolloError, useMutation } from "@apollo/client";
import { ADD_TODO, GET_TODOS } from "../../apollo/todos";
import { AllTodosCache, IList } from "../../types";

type AddTodoType = (options: {
  variables: { text: string; checked: boolean };
}) => void;

export const useGetAddTodo = (): [AddTodoType, ApolloError | undefined] => {
  const [addTodo, { error: addError }] = useMutation(ADD_TODO, {
    update(cache, { data: { createTodo } }) {
      const prevTodos = cache.readQuery<AllTodosCache>({
        query: GET_TODOS,
      })?.allTodos;
      cache.writeQuery({
        query: GET_TODOS,
        data: {
          allTodos: [createTodo, ...(prevTodos as IList[])],
        },
      });
    },
  });

  return [addTodo, addError];
};
