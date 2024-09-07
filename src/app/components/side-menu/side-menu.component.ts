import { Component, computed, effect, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '@shared/services/data/todos.service';

export type Order = "New" | "Old" 

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  protected ts = inject(TodoService);

  filterInput = model<string>("");
  private _filterEffect = effect(() => {
    const filterInput = this.filterInput();
    this.ts.filterTodoString.set(filterInput);
  },
  {
    allowSignalWrites: true,
  }
);
  
  resetInput() {
    this.filterInput.set("");
  }
  handleOpenTodoModal() {
    this.ts.selectedTodoId.set(0);
  }
  toggleOrder (newOrder: Order) {
    this.ts.orderTodo.set(newOrder);
  }
}
