import { Todo } from "@shared/models/todo.model";

export function sortTodos(todos: Todo[], order: string[]) {
    return todos
        .slice()
        .sort((a, b) => {
            // Sort based on the index in order array
            const indexA = order.indexOf(a.title);
            const indexB = order.indexOf(b.title);
            return indexA - indexB;
        });
}