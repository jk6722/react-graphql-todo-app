export interface IList {
  text: string;
  checked: boolean;
  id: string;
  __typename?: string;
}

export interface AllTodosCache {
  allTodos: IList[];
}
