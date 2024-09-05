import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';
import { TodoStatus } from '@shared/models/todo.model';
import { TodoService } from '@shared/services/data/todos.service';

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
  protected ts = inject(TodoService);

  _todos = computed(() => this.ts.todos()); // TODO: filter data here
  _pending = computed(() => this._todos()?.filter(todo => todo.status === "pending" as TodoStatus));
  _active = computed(() => this._todos()?.filter(todo => todo.status === "active" as TodoStatus));
  _completed = computed(() => this._todos()?.filter(todo => todo.status === "completed" as TodoStatus));

  async ngOnInit() {
  }
}
