import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    SelectButtonModule,
    ButtonModule
  ],
  templateUrl: './create-section.html',
  styleUrl: './create-section.css',
})
export class CreateSection implements OnInit {
  sessionForm!: FormGroup;

  categories = [
    { id: 1, label: 'Formación', value: 1 },
    { id: 2, label: 'Reunión', value: 2 },
    { id: 3, label: 'Marketing', value: 3 },
    { id: 4, label: 'Demo', value: 4 }
  ];

  statusOptions = [
    { label: 'Borrador', value: 'borrador' },
    { label: 'Bloqueado', value: 'bloqueado' },
    { label: 'Oculto', value: 'oculto' }
  ];

  constructor(private fb: FormBuilder, private ref: DynamicDialogRef) {}

  ngOnInit() {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    this.sessionForm = this.fb.group({
      image: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [null, Validators.required],
      city: ['', Validators.required],
      date: [now, Validators.required],
      startTime: [now, Validators.required],
      endTime: [oneHourLater, Validators.required],
      status: ['borrador', Validators.required]
    });
  }

  onSubmit() {
    if (this.sessionForm.valid) {
      console.log('Form Submitted:', this.sessionForm.value);
      this.ref.close(this.sessionForm.value);
    } else {
      Object.values(this.sessionForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onFileUpload(event: any) {
    const file = event.files[0];
    this.sessionForm.patchValue({ image: file });
  }

  cancel() {
    console.log('cancel');
    this.ref.close();
  }
}
