import { Todo, TodoStatus } from "../todo.model";

export type TodoAction = 
{
    action: TodoDatabaseAction,
    data: Todo,
} | TodoUpdateAction;

export type TodoDatabaseAction = "todo/create" | "todo/delete" | "todo/update";
export type TodoUpdateAction = {
    action: "todo/update",
    data: Todo,
    // Updated variables
    status?: TodoStatus,
    title?: string,
    description?: string
}