export type TodoStatus = "pending" | "active" | "completed" | "discarded";
export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: TodoStatus;
}