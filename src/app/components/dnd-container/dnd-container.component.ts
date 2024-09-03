import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DndSlotComponent } from './dnd-slot/dnd-slot.component';

@Component({
  selector: 'app-dnd-container',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    DndSlotComponent
  ],
  templateUrl: './dnd-container.component.html',
  styleUrl: './dnd-container.component.css'
})
export class DndContainerComponent {
  pending = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  active = ['test1', 'test12', 'test13',]
  completed = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.element.nativeElement, event.container.id);
      console.log(event.item.data());
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
