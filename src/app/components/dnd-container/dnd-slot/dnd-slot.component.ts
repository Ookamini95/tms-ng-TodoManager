import { CdkDrag, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { NgClass } from '@angular/common';
import { Component, computed, input, OnInit } from '@angular/core';
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
export class DndSlotComponent implements OnInit {
  todo = input.required<Todo>();
  

  private _status = computed(() => this.todo().status);
  // private _statusEffect = effect(() => {

  // })
  styles() {
    const baseClasses = "fix size-32 ring-2 ring-white/15 cursor-grab rounded-3xl "
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

  onDragEnter(e: CdkDragEnter) {
    setTimeout(() => {
      // console.log(e.container.id, "mammaima", e.currentIndex);
      const dropContainer = e.item._dragRef['_dropContainer'];
      console.log("drop: ", dropContainer, "/n");
      if (dropContainer) {
        dropContainer['_cacheParentPositions']();
        dropContainer['_siblings'].forEach( (s: any) => {
          s._clientRect = s.element.getBoundingClientRect();
          console.log(s, s._clientRect);
        });
      }
      e.container._dropListRef['_cacheParentPositions']()
    }, 500)
  }

  ngOnInit() {
    // console.log(this._status(), this.todo());
  }
}
