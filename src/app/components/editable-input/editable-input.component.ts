import { Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';

export type InputType = 
  | 'text'
  | 'number'
  | 'password'

@Component({
  selector: 'app-editable-input',
  standalone: true,
  imports: [],
  templateUrl: './editable-input.component.html',
  styleUrl: './editable-input.component.css'
})
export class EditableInputComponent {

  inputType = input<InputType>("text");
  inputValue = input<any>("");

  inputTag = input<string | undefined>(undefined); // TODO: used to track mutations on data

  _inputElement = viewChild<ElementRef<HTMLInputElement>>("inputEdit");
  inputElement = computed(() => this._inputElement()?.nativeElement);

  _editMode = signal(false);
  _inputType = computed(() => {
    if (this.inputType() === "password") return this.inputType(); // TODO: password
    return this._editMode() ? this.inputType() : 'text' as InputType;
  });
  handleEditMode() {
    this._editMode.update(prev => !prev);
    if (this._editMode()) this.inputElement()?.focus();
  }
  handleBlur() {
    this.inputElement()!.selectionStart = 0;
    this.inputElement()!.selectionEnd = 0;
    this._editMode.set(false);
  }
}
