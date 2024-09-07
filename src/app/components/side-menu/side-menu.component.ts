import { Component, inject } from '@angular/core';
import { TodoService } from '@shared/services/data/todos.service';

export type Order = "New" | "Old" 

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  protected ts = inject(TodoService);

  handleOpenTodoModal() {
    this.ts.selectedTodoId.set(0);
  }

  toggleOrder (newOrder: Order) {
    this.ts.orderTodo.set(newOrder);
  }
}
