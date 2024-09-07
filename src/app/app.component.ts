import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';
import { Todo, TodoStatus } from '@shared/models/todo.model';
import { TodoService } from '@shared/services/data/todos.service';
import { ModalTodoComponent } from '@components/modal/modal-todo/modal-todo.component';
import { SideMenuComponent } from '@components/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    DndSlotComponent,
    ModalTodoComponent,
    SideMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  protected ts = inject(TodoService);

  _filter = computed(() => this.ts.filterTodoString());
  _todos = computed(() => {
    const todos = this.ts.todos();
    return this._filter() ? this._filterTodos(todos) : todos;
  });
  _pending = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "pending" as TodoStatus)));
  _active = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "active" as TodoStatus)));
  _completed = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "completed" as TodoStatus)));

  async ngOnInit() {
  }

  private _filterTodos(todos: Todo[] | undefined) {
    if (!todos || !todos.length) return [];
    const filter = this._filter();
    return todos.filter(todo => {
      return todo.title.toLowerCase().includes(filter.toLowerCase());
    })
  }

  private _sortTodos(todos: Todo[] | undefined) {
    if (!todos || !todos.length) return [];
    const order = this.ts.orderTodo();
    return todos.sort((a, b) => {
      switch (order) {
        case 'New':
          return b.id - a.id;
        case 'Old':
          return a.id - b.id;
        default:
          return 0;
      }
    })
  }
}
