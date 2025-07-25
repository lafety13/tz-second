import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  onSave: (data: any, ref: DialogRef) => void;
}

@Component({
  selector: 'app-create-project',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss'
})
export class CreateProjectComponent {
  private fb = inject(NonNullableFormBuilder);
  private dialogRef = inject(DialogRef);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  form = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    owner: ['', Validators.required],
    deadline: ['', Validators.required],
  });

  submit() {
    this.data.onSave(this.form.getRawValue(), this.dialogRef)
  }
}
