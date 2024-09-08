import { AfterViewInit, Component, computed, inject, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { EditableInputComponent } from '@components/editable-input/editable-input.component';
import { DndSlotControlComponent } from './dnd-slot-control/dnd-slot-control.component';

import { Todo } from '@shared/models/todo.model';
import { TodoService } from '@shared/services/data/todos.service';
import { TodoUpdateAction } from '@shared/models/actions/todo.action';

@Component({
  selector: 'app-dnd-slot',
  standalone: true,
  imports: [
    NgClass,
    CdkDrag,
    EditableInputComponent,
    DndSlotControlComponent
  ],
  templateUrl: './dnd-slot.component.html',
  styleUrl: './dnd-slot.component.css'
})
export class DndSlotComponent implements AfterViewInit {

  protected ts = inject(TodoService);

  todo = input.required<Todo>();
  animationIdx = input<number>();

  private _status = computed(() => this.todo().status);
  private _title = computed(() => this.todo().title);
  private _id = computed(() => this.todo().id);

  private dropAnimation = signal(true);

  onEditableTitleChange(a: TodoUpdateAction) {
    this.ts.updateTodo(a);
  }


  styles() {
    let baseClasses = "h-40 w-[28rem] ring-2 ring-white/15 cursor-grab rounded-3xl ";
    if (this.dropAnimation()) baseClasses += "drop ";
    switch (this._status()) {
      case 'pending':
        return baseClasses + "bg-red-400";
      case 'active':
        return baseClasses + "bg-yellow-400";
      case 'completed':
        return baseClasses + "bg-green-400";
      // case 'discarded': TODO: [optional] undo trashbin
      default:
        return baseClasses;
    }
  }

  ngAfterViewInit() {
    const id = +this._id();
    setTimeout(() => {
      this.dropAnimation.set(false);
    }, 300)
  }
}
