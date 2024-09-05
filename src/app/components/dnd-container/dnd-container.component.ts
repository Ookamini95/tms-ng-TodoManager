import { Component, computed, effect, input, output, Signal, signal, WritableSignal, inject, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DndSlotComponent } from './dnd-slot/dnd-slot.component';
import { Todo, TodoStatus } from '@shared/models/todo.model';
import { sortTodos } from './dnd.utils';
import { TodoAction, TodoUpdateAction } from '@shared/models/actions/todo.action';

// TODO: flicker when dnd from list a to list b [Workaround > deactivated animations with css + deactivated cdkOrdering]
// https://stackoverflow.com/questions/61559834/element-style-doesnt-apply-when-using-cdkdroplist-angluar-cdk-drag-and-drop
// https://github.com/angular/components/issues/14703

@Component({
  selector: 'app-dnd-container',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    DndSlotComponent,
  ],
  templateUrl: './dnd-container.component.html',
  styleUrl: './dnd-container.component.css'
})
export class DndContainerComponent {
  // TODO output for mutated todo
  // Pending Todos
  pending = input<Todo[] | undefined>(); // TODO: undefined during loading
  _initPendingEffect = effect(() => {
    const pending = this.pending();
    this._pendingOrdered.set(pending?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _pendingOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _pending = computed(() => { // Ordered array for Cdk > sorted by title
    const pending = this.pending();
    const orderedTitles = this._pendingOrdered();
    return sortTodos(pending ?? [], orderedTitles);
  });
  // Active Todos
  active = input<Todo[] | undefined>(); // TODO: undefined during loading
  _initActiveEffect = effect(() => {
    const active = this.active();
    this._activeOrdered.set(active?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _activeOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _active = computed(() => { // Ordered array for Cdk > sorted by title
    const active = this.active();
    const orderedTitles = this._activeOrdered();
    return sortTodos(active ?? [], orderedTitles);
  })
  // Completed Todos
  completed = input<Todo[] | undefined>(); // TODO: undefined during loading
  _initCompletedEffect = effect(() => { 
    const completed = this.completed();
    this._completedOrdered.set(completed?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _completedOrdered = signal<string[]>([]); // Ordered array for Cdk > titles
  _completed = computed(() => {// Ordered array for Cdk > sorted by title
    const completed = this.completed();
    const orderedTitles = this._completedOrdered();
    return sortTodos(completed ?? [], orderedTitles);
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
}