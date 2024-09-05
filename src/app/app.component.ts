import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';
import { Todo, TodoStatus } from '@shared/models/todo.model';
import { ApiService } from '@shared/services/data/api.service';
import { TodoUpdateAction } from '@shared/models/actions/todo.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    DndSlotComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private api = inject(ApiService);

  _todos = signal<Todo[] | undefined>(undefined);
  _pending = computed(() => this._todos()?.filter(todo => todo.status === "pending" as TodoStatus));
  _active = computed(() => this._todos()?.filter(todo => todo.status === "active" as TodoStatus));
  _completed = computed(() => this._todos()?.filter(todo => todo.status === "completed" as TodoStatus));

  async ngOnInit() {
    console.log("/ ", this._pending());
    this._todos.set(await this.api.getTodos());
  }

  updateTodos(a: TodoUpdateAction) {
    this._todos.update(prev => {
      if (!prev) return [];
      return prev.map(todo => todo.id === a.data.id ? { ...todo, status: a.status! } : todo);
    });
  }
}
