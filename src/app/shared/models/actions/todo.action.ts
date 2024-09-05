import { Todo, TodoStatus } from "../todo.model";

export type TodoAction = 
{
    action: TodoDatabaseAction,
    id: number,
    data?: Todo,
} | TodoUpdateAction;

export type TodoDatabaseAction = "todo/create" | "todo/delete" | "todo/update";
export type TodoUpdateAction = {
    action: "todo/update",
    id: number,
    data?: Todo,
    // Updated variables
    status?: TodoStatus,
    title?: string,
    description?: string
}