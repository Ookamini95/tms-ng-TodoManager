import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { TodoService } from '@shared/services/data/todos.service';

@Component({
    selector: 'app-modal-todo',
    standalone: true,
    templateUrl: './modal-todo.component.html',
    styleUrl: "./modal-todo.component.css",
    imports: [
        ModalComponent,
        ReactiveFormsModule
    ]
})
export class ModalTodoComponent {
    private fb = inject(FormBuilder);
    private ts = inject(TodoService);

    protected _editMode = computed(() => !!this.todoId()); // id starts from 1
    onClose = output<boolean>();


    protected todoForm: FormGroup = this.fb.group({
        title: ["", Validators.required],
        description: [""],
        status: ["pending", Validators.required],
    })

    todoId = input.required<number>();
    _idChangeEffect = effect(() => {
        const id = this.todoId();
        if (this._editMode()) {
            const todo = this.ts._getTodo(id);
            console.log("TODOOOO ", todo);
            if (!todo) return;
            this.todoForm.patchValue({
                title: todo.title,
                description: todo.description,
                status: todo.status,
            });
        }
    })

    handleSubmit(form: FormGroup): void {
        if (form.invalid) return;
        console.log(form.value);

        if (!this._editMode()) {
            const id = this.ts.generateUuid();
            console.log("id. ", id, "data. ", form.value);
            this.ts.makeTodo({
                action: "todo/create",
                id,
                data: {
                    id,
                    ...form.value,
                }
            })
        }
        else {
            const id = this.todoId()
            this.ts.updateTodo({
                action: "todo/update",
                id,
                data: {
                    id,
                    ...form.value
                },
                ...form.value
            })
        }

        this._resetForm(form);
    }

    protected _resetForm(form: FormGroup): void {
        form.reset();
        form.get("status")!.setValue("pending");
        this.onClose.emit(true);
        this._closeModal();
    }
    private _closeModal(): void {
        const modal = (document.getElementById("todo_modal") as any);
        if (modal) modal.close();
    }
}