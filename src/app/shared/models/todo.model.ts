export interface Todo {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "active" | "completed" | "discarded";
}