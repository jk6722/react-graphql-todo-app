import { ChangeEvent, useCallback, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_TODOS } from "./apollo/todos";

import TodoItem from "./components/TodoItem";
import { IList } from "./types";
import {
  useGetUpdateTodo,
  useGetRemoveTodo,
  useGetAddTodo,
} from "./hooks/mutations";

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [input, setInput] = useState<string>("");
  const [addTodo, addError] = useGetAddTodo();
  const [removeTodo, removeError] = useGetRemoveTodo();
  const [updateTodo, updateError] = useGetUpdateTodo();

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setInput(e.target.value);
    },
    []
  );

  const counter = useCallback((): string => {
    if (data?.allTodos as IList[]) {
      const completed: IList[] = data.allTodos.filter(
        (todo: IList) => todo.checked
      );
      return `${completed.length}/${data.allTodos.length}`;
    }
    return "0/0";
  }, [data]);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // 페이지 리프레시 방지
      if (input.trim() === "") return;
      addTodo({
        variables: {
          text: input,
          checked: false,
        },
      });
      setInput("");
    },
    [input]
  );

  const sort = (list: IList[]): IList[] => {
    const newList = [...list];
    return newList.sort((a, b) => +a.checked - +b.checked);
  };

  // 에러 발생시
  if (error) return <div>Network error</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="mt-5 text-3xl">
        Todo App <span className="text-sm">({counter()})</span>
      </div>
      <div className="w-5/6 md:w-1/2 lg:w-3/5">
        <form
          className="flex justify-between p-5 my-5 text-4xl border-2 rounded-md shadow-md"
          onSubmit={handleAddTodo}
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="할 일을 작성해주세요."
            className="outline-none border-b-[1px] text-xl w-10/12 focus:border-b-[3px]"
          />
          <div>
            <button type="submit" className="hover:scale-105">
              +
            </button>
          </div>
        </form>
        {loading ? (
          <div>loading...</div>
        ) : (
          <ul>
            {data &&
              sort(data.allTodos).map((todo: IList) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleRemove={removeTodo}
                  handleUpdate={updateTodo}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
