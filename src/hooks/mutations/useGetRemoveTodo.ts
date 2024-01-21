import { ApolloError, useMutation } from "@apollo/client";
import { REMOVE_TODO } from "../../apollo/todos";

type RemoveTodoType = (options: { variables: { id: number } }) => void;

export const useGetRemoveTodo = (): [
  RemoveTodoType,
  ApolloError | undefined
] => {
  const [removeTodo, { error: removeError }] = useMutation(REMOVE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos: readonly { __ref: string }[] = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });
  return [removeTodo, removeError];
};
