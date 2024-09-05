import { CdkDrag } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { AfterViewInit, Component, computed, input, OnInit, signal } from '@angular/core';
import { EditableInputComponent } from '@components/editable-input/editable-input.component';
import { Todo } from '@shared/models/todo.model';

@Component({
  selector: 'app-dnd-slot',
  standalone: true,
  imports: [
    NgClass,
    CdkDrag,
    EditableInputComponent,
  ],
  templateUrl: './dnd-slot.component.html',
  styleUrl: './dnd-slot.component.css'
})
export class DndSlotComponent implements AfterViewInit {
  todo = input.required<Todo>();
  animationIdx = input<number>();
  protected dropAnimation = signal(true); // TODO: animations are not fluid due to lib not optimized for complex css animations see
  private _status = computed(() => this.todo().status);
  private _id = computed(() => this.todo().id);
  // private _statusEffect = effect(() => {

  // })
  styles() {
    let baseClasses = "size-32 ring-2 ring-white/15 cursor-grab rounded-3xl ";
    if (this.dropAnimation()) baseClasses += "drop ";
    switch (this._status()) {
      case 'pending':
        return baseClasses + "bg-red-400";
      case 'active':
        return baseClasses + "bg-yellow-400";
      case 'completed':
        return baseClasses + "bg-green-400";
      // case 'discarded':
      default:
        return baseClasses;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dropAnimation.set(false);
    }, this.todo().id * 100)
  }
}
