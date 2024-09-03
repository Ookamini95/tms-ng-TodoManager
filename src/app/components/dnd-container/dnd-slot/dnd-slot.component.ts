import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dnd-slot',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './dnd-slot.component.html',
  styleUrl: '../../../app.component.css'
})
export class DndSlotComponent implements OnInit {
  handle = input<boolean>(false);
  item = input.required<string>();
  slot = input.required<number>();
  
  ngOnInit() {
    console.log("slot : ", this.slot(), "item : ", this.item());
  }
}
