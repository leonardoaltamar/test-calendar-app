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
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

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
  isEdit: boolean = false;

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

  constructor(
    private fb: FormBuilder, 
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    const sessionData = this.config.data?.session;
    this.isEdit = !!sessionData;

    const initialValues = sessionData || {
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
        status: 'borrador'
    };

    this.sessionForm = this.fb.group({
      image: [sessionData?.image || null],
      title: [sessionData?.title || '', Validators.required],
      description: [sessionData?.description || '', Validators.required],
      category: [sessionData?.category || null, Validators.required],
      city: [sessionData?.city || '', Validators.required],
      date: [new Date(initialValues.date || initialValues.start), Validators.required],
      startTime: [new Date(initialValues.startTime || initialValues.start), Validators.required],
      endTime: [new Date(initialValues.endTime || initialValues.end), Validators.required],
      status: [initialValues.status, Validators.required]
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
