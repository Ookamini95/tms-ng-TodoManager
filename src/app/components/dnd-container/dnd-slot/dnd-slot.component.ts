import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, computed, effect, input, OnInit } from '@angular/core';
import { Todo } from '@shared/models/todo.model';

@Component({
  selector: 'app-dnd-slot',
  standalone: true,
  imports: [
    CdkDrag
  ],
  templateUrl: './dnd-slot.component.html',
  styleUrl: './dnd-slot.component.css'
})
export class DndSlotComponent implements OnInit {
  todo = input.required<Todo>();
  
  private _status = computed(() => this.todo().status);
  private _statusEffect = effect(() => {

  })
  
  ngOnInit() {
    console.log(this._status(), this.todo());
  }
}
