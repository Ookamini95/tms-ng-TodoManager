import { Todo, TodoStatus } from "../todo.model";

export type TodoAction = { action: TodoOrderAction, data: Todo, status?: TodoStatus };

export type TodoOrderAction = "todo/move" | "todo/transfer";
export type TodoDatabaseAction = "todo/create" | "todo/delete" | "todo/update";