import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IList } from "../types";

import { FiEdit, FiMinusCircle } from "react-icons/fi";

interface TodoItemProps {
  todo: IList;
  handleRemove: (options: { variables: { id: string } }) => void;
  handleUpdate: (options: { variables: IList }) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleRemove,
  handleUpdate,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [task, setTask] = useState<string>(todo.text);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  }, []);

  const handleChangeText = useCallback(
    (todo: IList) => {
      setEdit((prev) => !prev);
      if (edit) {
        handleUpdate({
          variables: todo,
        });
      }
    },
    [edit]
  );

  const handlePressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        handleUpdate({
          variables: {
            id: todo.id,
            text: task,
            checked: todo.checked,
          },
        });
        setEdit(false);
      }
    },
    [task, todo]
  );

  const handleClickRemove = useCallback(() => {
    handleRemove({ variables: { id: todo.id } });
  }, []);

  const handleUpdateCheck = useCallback(() => {
    handleUpdate({
      variables: {
        id: todo.id,
        text: task,
        checked: !todo.checked,
      },
    });
  }, [task, todo]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  return (
    <li className="flex items-center justify-between p-5 my-3 text-2xl duration-300 hover:scale-105 border-2 rounded-md shadow-md">
      <div className="flex items-center w-10/12">
        <input
          type="checkbox"
          className="hover:scale-105 hover:cursor-pointer"
          checked={todo.checked}
          onChange={handleUpdateCheck}
        />
        <input
          type="text"
          disabled={!edit}
          value={task}
          onChange={handleChangeTask}
          onKeyDown={handlePressEnter}
          ref={inputRef}
          className={`outline-none h-[25px] text-xl w-full mx-5 px-3 disabled:bg-transparent focus:border-b-[1px] ${
            todo.checked && "line-through"
          } text-stone-500`}
        />
      </div>
      <div className="flex justify-between w-1/6">
        <FiEdit
          className="hover:scale-105 hover:cursor-pointer"
          onClick={() =>
            handleChangeText({ id: todo.id, text: task, checked: todo.checked })
          }
        />
        <FiMinusCircle
          className="hover:scale-105 hover:cursor-pointer"
          onClick={handleClickRemove}
        />
      </div>
    </li>
  );
};

export default TodoItem;
