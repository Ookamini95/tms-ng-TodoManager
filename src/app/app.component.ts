import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DndContainerComponent } from './components/dnd-container/dnd-container.component';
import { DndSlotComponent } from './components/dnd-container/dnd-slot/dnd-slot.component';
import { Todo } from '@shared/models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DndContainerComponent,
    DndSlotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
// TODO remove swappy
  exampleTodo: Todo = {
    id: 1,
    status: "pending",
    title: "Test 2",
    description: "lorem ipsum",
  }
}
