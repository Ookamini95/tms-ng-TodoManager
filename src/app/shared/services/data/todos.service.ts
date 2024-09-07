import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo } from '@shared/models/todo.model';
import { ApiService } from './api.service';
import { TodoAction, TodoUpdateAction } from '@shared/models/actions/todo.action';
import { Order } from '@components/side-menu/side-menu.component';
import { AlertService } from '../components/alert.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private api = inject(ApiService);
    private alert = inject(AlertService);

    todos = signal<Todo[] | undefined>(undefined);
    selectedTodoId = signal<number>(0);

    // Side Menu
    orderTodo = signal<Order>("Old");
    filterTodoString = signal<string>("");

    _session_id = signal<number>(1);
    _internal_id = computed(() => this.todos()?.reduce((max, todo) => todo.id > max ? +todo.id : max, 0));

    constructor() {
        this.api.getTodos()
            .then(todos => this.todos.set(todos))
            .catch(e => {
                console.error(e);
                console.log(" test ");
                this.todos.set([]);
                this.alert.error("Cannot connect with db: functionalities may be affected")
            })
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
    _getTodo(id: number): Todo | undefined {
        return this.todos()?.find(todo => todo.id === id);
    }
    updateTodo(a: TodoUpdateAction) {
        this.todos.update(prev => {
            if (!prev) return [];
            return prev.map(todo => todo.id === a.id ? this._updateTodo(todo, a) : todo);
        });

        const newTodo = this._getTodo(a.id)!;
        this.api.patchTodo({
            action: "todo/update",
            id: a.id,
            data: newTodo,
        });
    }

    generateUuid() {
        let uuid = this._internal_id() ?? 0;
        uuid += this._session_id();
        this._session_id.update(id => ++id);
        return uuid;
    }
    makeTodo(a: TodoAction) {
        console.log("new todo: ", a);
        if (!a.data) return;
        this.todos.update(p => [a.data!, ...p!])
        this.api.postTodo(a);
    }


    deleteTodo(a: TodoAction) {
        this.todos.update(todos => todos?.filter(todo => todo.id !== a.id));
        this.api.deleteTodo(a.id);
    }
}