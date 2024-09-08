import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';
import { Todo, TodoStatus } from '@shared/models/todo.model';
import { TodoService } from '@shared/services/data/todos.service';
import { ModalTodoComponent } from '@components/modal/modal-todo/modal-todo.component';
import { SideMenuComponent } from '@components/side-menu/side-menu.component';
import { AlertComponent } from '@components/alert/alert.component';
import { AlertService } from '@shared/services/components/alert.service';
import { ModalDashboardComponent } from '@components/modal/modal-dashboard/modal-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    DndSlotComponent,
    ModalTodoComponent,
    ModalDashboardComponent,
    SideMenuComponent,
    AlertComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected ts = inject(TodoService);
  protected alert = inject(AlertService);

  _filter = computed(() => this.ts.filterTodoString());
  _todos = computed(() => {
    const todos = this.ts.todos();
    return this._filter() ? this._filterTodos(todos) : todos;
  });
  _pending = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "pending" as TodoStatus)));
  _active = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "active" as TodoStatus)));
  _completed = computed(() => this._sortTodos(this._todos()?.filter(todo => todo.status === "completed" as TodoStatus)));

  // Modal
  _selectedId = computed(() => String(this.ts.selectedTodoId()))

  // Alert
  _alertStatus = computed(() => this.alert.alertStatus());
  _alertMessage = computed(() => this.alert.alertMessage());

  // Todo stats
  _todosWorkinProgress = computed(() => {
    const p = this._pending()?.length || 0;
    const a = this._active()?.length || 0;
    return a + p;
  });
  _todosCompleted = computed(() => {
    const c = this._completed()?.length || 0;
    return c;
  })

  private _filterTodos(todos: Todo[] | undefined) {
    if (!todos || !todos.length) return [];
    const filter = this._filter();
    return todos.filter(todo => {
      return todo.title.toLowerCase().includes(filter.toLowerCase());
    })
  }
  private _sortTodos(todos: Todo[] | undefined) {
    if (!todos) return undefined;
    const order = this.ts.orderTodo();
    return todos.sort((a, b) => {
      switch (order) {
        case 'New':
          return Number(b.id) - Number(a.id);
        case 'Old':
          return Number(a.id) - Number(b.id);
        default:
          return 0;
      }
    })
  }
}
