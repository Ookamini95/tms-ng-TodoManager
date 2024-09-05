export type TodoStatus = "pending" | "active" | "completed" | "discarded";
export interface Todo {
    id: number;
    title: string;
    description?: string;
    status: TodoStatus;
}