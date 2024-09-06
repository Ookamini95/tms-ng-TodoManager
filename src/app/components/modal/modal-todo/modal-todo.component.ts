import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { Todo } from '@shared/models/todo.model';
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

export class ModalTodoComponent implements OnInit {
    private fb = inject(FormBuilder);
    private ts = inject(TodoService);

    protected todoForm: FormGroup = this.fb.group({
        title: ["", Validators.required],
        description: [""],
        status: ["pending", Validators.required],
    })

    todo = input<Todo>();

    handleSubmit(form: FormGroup): void {
        if (form.invalid) return;
        console.log(form.value);

        const id = this.ts.generateUuid();
        this.ts.makeTodo({
            action: "todo/create",
            id,
            data: {
                id,
                ...form.value,
            }
        })

        form.reset();
        form.get("status")!.setValue("pending");
        this._closeModal();
    }

    private _closeModal(): void {
        (document.getElementById("my_modal_5") as any).close();
    }

    ngOnInit() {

    }
}