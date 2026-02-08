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
import { Category, Status } from '../../../../core/models';

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
  minDate: Date = new Date();
  categories: Category[] = [];
  statusOptions: Status[] = [];
  deletePermission: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.categories = this.config.data?.categories || [];
    this.statusOptions = this.config.data?.statusOptions || [];
  }

  ngOnInit() {
    const sessionData = this.config.data?.session;
    this.deletePermission = this.config.data?.deletePermission;
    this.isEdit = !!sessionData;

    // Resetear minDate a las 00:00:00 para permitir hoy completo
    this.minDate.setHours(0, 0, 0, 0);

    const initialValues = sessionData || {
        date: new Date(),
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        status: 1
    };

    // Asegurar que las fechas existan y sean objetos Date válidos
    const dateValue = new Date(initialValues.date || initialValues.start || new Date());
    const startValue = new Date(initialValues.start || initialValues.date || new Date());
    const endValue = new Date(initialValues.end || startValue || new Date());

    this.sessionForm = this.fb.group({
      image: [sessionData?.image || null],
      title: [sessionData?.title || '', Validators.required],
      description: [sessionData?.description || '', Validators.required],
      category: [sessionData?.category || null, Validators.required],
      city: [sessionData?.city || '', Validators.required],
      date: [dateValue, Validators.required],
      start: [startValue, Validators.required],
      end: [endValue, Validators.required],
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

  onDelete() {
    this.ref.close({ action: 'delete' });
  }

  cancel() {
    console.log('cancel');
    this.ref.close();
  }
}
