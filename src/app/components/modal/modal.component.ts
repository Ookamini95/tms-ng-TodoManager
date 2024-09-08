import { Component, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: "./modal.component.css"
})
export class ModalComponent {
  id = input.required<string>();
  dark = input<boolean>();
}
