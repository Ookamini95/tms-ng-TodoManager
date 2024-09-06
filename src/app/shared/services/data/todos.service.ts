import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '@shared/models/todo.model';
import { ApiService } from './api.service';
import { TodoAction, TodoUpdateAction } from '@shared/models/actions/todo.action';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private api = inject(ApiService);

    todos = signal<Todo[] | undefined>(undefined);
    // TODO: use uuid module here instead
    _session_id = signal<number>(1);
    _internal_id = computed(() => this.todos()?.reduce((max, todo) => todo.id > max ? +todo.id : max, -Infinity));
    
    constructor() {
        this.api.getTodos()
            .then(todos => this.todos.set(todos))
            .catch(console.error)
            .finally(() => console.log("READY ", this._internal_id(), '   '));
    }

    private _updateTodo(todo: Todo, a: TodoUpdateAction) {
        const shallow = { ...todo };
        if (a.title)
            shallow.title = a.title;
        if (a.description)
            shallow.description = a.description;
        if (a.status)
            shallow.status = a.status;
        return shallow;
    }
    updateTodo(a: TodoUpdateAction) {
        this.todos.update(prev => {
            if (!prev) return [];
            return prev.map(todo => todo.id === a.id ? this._updateTodo(todo, a) : todo);
        });
        // Todo: patch todo
    }

    generateUuid() {
        let uuid = this._internal_id() ?? 0;
        uuid += this._session_id();
        this._session_id.update(id => ++id);
        return uuid;
    }
    makeTodo(a: TodoAction) {
        console.log("new todo: ", a);
        // TODO: update local
        // TODO: api post
    }

    deleteTodo(a: TodoAction) {
        this.todos.update(todos => todos?.filter(todo => todo.id !== a.id));
        this.api.deleteTodo(a.id);
    }

}