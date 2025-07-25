import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogRef} from '@angular/cdk/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProjectCard} from '../../../list/interfaces/card.interface';

export interface DialogData {
  onSave: (data: Omit<ProjectCard, 'id'>, ref: DialogRef) => void;
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
    this.data.onSave(this.form.getRawValue() as Omit<ProjectCard, 'id'>, this.dialogRef)
  }
}
