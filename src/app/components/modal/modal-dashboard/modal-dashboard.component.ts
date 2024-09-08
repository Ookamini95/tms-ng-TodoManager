import { Component, computed, input } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
    selector: 'app-modal-dash',
    standalone: true,
    imports: [
        ModalComponent,
    ],
    templateUrl: './modal-dashboard.component.html',
    styleUrl: './modal-dashboard.component.css',
})
export class ModalDashboardComponent {
    workingTodos = input.required<number>();
    completeTodos = input.required<number>();
    private _total = computed(() => {
        const w = this.workingTodos();
        const c = this.completeTodos();
        return w + c;
    });

    value = computed(() => {
        const total = this._total();
        const w = this.completeTodos();
        console.log(w, total, w / total);
        const value = w / total;
        return Math.floor(value * 100);
    })
    style = computed(() => {
        const value = this.value();
        return `--value:${value}`;
    });
}