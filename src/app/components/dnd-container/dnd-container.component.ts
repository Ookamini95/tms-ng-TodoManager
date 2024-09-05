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
import { TodoAction } from '@shared/models/actions/todo.action';

// TODO: flicker when dnd from list a to list b 
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
  cdr = inject(ChangeDetectorRef);
  // TODO _pending _active _completed should be inputs
  // TODO output for mutated todo
  // Pending Todos
  pending = input<Todo[] | undefined>(); // TODO: undefined during loading
  _initPendingEffect = effect(() => {
    const pending = this.pending();
    this._pendingOrdered.set(pending?.map(x => x.title) ?? []);
  }, { allowSignalWrites: true });
  _pendingOrdered = signal<string[]>([]); // Ordered array for Cdk > sorted by title
  _pending = computed(() => {
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
  _activeOrdered = signal<string[]>([]); // Ordered array for Cdk > sorted by title
  _active = computed(() => {
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
  _completedOrdered = signal<string[]>([]); // Ordered array for Cdk > sorted by title
  _completed = computed(() => {
    const completed = this.completed();
    const orderedTitles = this._completedOrdered();
    return sortTodos(completed ?? [], orderedTitles);
  })


  private getListById(identifier: TodoStatus): { todos: Signal<Todo[] | undefined>, orderList: WritableSignal<string[]> } {
    switch (identifier) {
      case 'pending':
        return {
          todos: this.pending,
          orderList: this._pendingOrdered
        }
      case 'active':
        return {
          todos: this.active,
          orderList: this._activeOrdered
        }
      case 'completed':
        return {
          todos: this.completed,
          orderList: this._completedOrdered
        }
      // TODO [optional thrashbin?] case 'discarded':
      default:
        throw new Error("Invalid identifier, cannot serve list");
    }
  }

  onDropTransfer = output<TodoAction>();

  drop(event: CdkDragDrop<string[]>) {
    const dropzone = this.getListById(event.container.id as TodoStatus);
    const dropShallowList = dropzone.orderList().slice();
    // TODO: [optional add ordering field to Todo] same status moves are kept in session (reload resets todo/move but not todo/transfer)
    if (event.previousContainer === event.container) {
      moveItemInArray(dropShallowList, event.previousIndex, event.currentIndex);
      dropzone.orderList.set(dropShallowList);
    } else {
      this.onDropTransfer.emit({
        action: "todo/transfer",
        data: event.item.data,
        status: event.container.id as TodoStatus,
      })
    }
  }
}
