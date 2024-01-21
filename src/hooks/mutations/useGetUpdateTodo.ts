import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_TODO } from "../../apollo/todos";
import { IList } from "../../types";

type UpdateTodoType = (options: { variables: IList }) => void;

export const useGetUpdateTodo = (): [
  UpdateTodoType,
  ApolloError | undefined
] => {
  const [updateTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  return [updateTodo, updateError];
};
