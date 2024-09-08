import { Component, computed, effect, input, output, signal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { DndSlotComponent } from './dnd-slot/dnd-slot.component';
import { DndEmptyComponent } from './dnd-empty/dnd-empty.component';
import { Todo, TodoStatus } from '@shared/models/todo.model';
import { TodoUpdateAction } from '@shared/models/actions/todo.action';


@Component({
  selector: 'app-dnd-container',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    DndSlotComponent,
    DndEmptyComponent
  ],
  templateUrl: './dnd-container.component.html',
  styleUrl: './dnd-container.component.css'
})
export class DndContainerComponent {
  // Pending Todos
  pending = input<Todo[] | undefined>();
  _initPendingEffect = effect(() => {
    const pending = this.pending();
    this._pendingOrdered.set(pending?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _pendingOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _pending = computed(() => { // Ordered array for Cdk > sorted by title
    const pending = this.pending();
    const orderedTitles = this._pendingOrdered();
    return this.sortTodos(pending ?? [], orderedTitles);
  });
  // Active Todos
  active = input<Todo[] | undefined>();
  _initActiveEffect = effect(() => {
    const active = this.active();
    this._activeOrdered.set(active?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _activeOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _active = computed(() => { // Ordered array for Cdk > sorted by title
    const active = this.active();
    const orderedTitles = this._activeOrdered();
    return this.sortTodos(active ?? [], orderedTitles);
  })
  // Completed Todos
  completed = input<Todo[] | undefined>();
  _initCompletedEffect = effect(() => {
    const completed = this.completed();
    this._completedOrdered.set(completed?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _completedOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _completed = computed(() => {// Ordered array for Cdk > sorted by title
    const completed = this.completed();
    const orderedTitles = this._completedOrdered();
    return this.sortTodos(completed ?? [], orderedTitles);
  })

  onDropTransfer = output<TodoUpdateAction>();
  drop(event: CdkDragDrop<string[]>) {
    this.onDropTransfer.emit({
      action: "todo/update",
      id: event.item.data.id,
      data: event.item.data,
      status: event.container.id as TodoStatus,
    })
  }

  private sortTodos(todos: Todo[], order: string[]) {
    return todos
      .slice()
      .sort((a, b) => {
        const indexA = order.indexOf(a.title);
        const indexB = order.indexOf(b.title);
        return indexA - indexB;
      });
  }
}