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
  public pending = input<Todo[] | undefined>();
  private _initPendingEffect = effect(() => {
    const pending = this.pending();
    this._pendingOrdered.set(pending?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  protected _pendingOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  protected _pending = computed(() => { // Ordered array for Cdk > sorted by title
    const pending = this.pending();
    const orderedTitles = this._pendingOrdered();
    return this._sortTodos(pending ?? [], orderedTitles);
  });
  // Active Todos
  public active = input<Todo[] | undefined>();
  private _initActiveEffect = effect(() => {
    const active = this.active();
    this._activeOrdered.set(active?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  protected _activeOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  protected _active = computed(() => { // Ordered array for Cdk > sorted by title
    const active = this.active();
    const orderedTitles = this._activeOrdered();
    return this._sortTodos(active ?? [], orderedTitles);
  })
  // Completed Todos
  public completed = input<Todo[] | undefined>();
  private _initCompletedEffect = effect(() => {
    const completed = this.completed();
    this._completedOrdered.set(completed?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  protected _completedOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  protected _completed = computed(() => {// Ordered array for Cdk > sorted by title
    const completed = this.completed();
    const orderedTitles = this._completedOrdered();
    return this._sortTodos(completed ?? [], orderedTitles);
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
  _sortTodos(todos: Todo[], order: string[]) {
    return todos
      .slice()
      .sort((a, b) => {
        const indexA = order.indexOf(a.title);
        const indexB = order.indexOf(b.title);
        return indexA - indexB;
      });
  }
}