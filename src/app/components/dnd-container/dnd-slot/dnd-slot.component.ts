import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dnd-slot',
  standalone: true,
  imports: [
    CdkDrag
  ],
  templateUrl: './dnd-slot.component.html',
  styleUrl: './dnd-slot.component.css'
})
export class DndSlotComponent {
  todo = input.required<string>();
}
