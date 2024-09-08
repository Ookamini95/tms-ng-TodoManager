import { Component, computed, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';
import { TodoUpdateAction } from '@shared/models/actions/todo.action';

export type InputType = 'text' | 'number' | 'password';
@Component({
  selector: 'app-editable-input',
  standalone: true,
  imports: [],
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.css'
})
export class EditableInputComponent {

  todoId = input.required<string>();
  inputType = input<InputType>("text");
  inputValue = input<any>("");

  valueChanged = output<TodoUpdateAction>();

  _inputElement = viewChild<ElementRef<HTMLInputElement>>("inputEdit");
  inputElement = computed(() => this._inputElement()?.nativeElement);

  _editMode = signal(false);
  _inputType = computed(() => {
    return this._editMode() ? this.inputType() : 'text' as InputType;
  });

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this._editMode()) {
      this._reset();
    }
  }
  
  handleEditMode() {
    this._editMode.update(prev => !prev);
    if (this._editMode()) this.inputElement()?.focus();
  }
  handleBlur() {
    this._reset();
  }
  handleChange(e: any) {
    this.valueChanged.emit({
      action: "todo/update",
      id: this.todoId(),
      title: e.target.value,
    })
  }
  private _reset() {
    this.inputElement()!.selectionStart = 0;
    this.inputElement()!.selectionEnd = 0;
    this.inputElement()?.blur();
    this._editMode.set(false);
  }
}
