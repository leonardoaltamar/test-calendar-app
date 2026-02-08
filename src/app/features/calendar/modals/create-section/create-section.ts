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
    this.isEdit = !!sessionData;

    const initialValues = sessionData || {
        date: new Date(),
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000),
        status: 'borrador'
    };

    this.sessionForm = this.fb.group({
      image: [sessionData?.image || null],
      title: [sessionData?.title || '', Validators.required],
      description: [sessionData?.description || '', Validators.required],
      category: [sessionData?.category || null, Validators.required],
      city: [sessionData?.city || '', Validators.required],
      date: [new Date(initialValues.date || initialValues.start), Validators.required],
      start: [new Date(initialValues.start), Validators.required],
      end: [new Date(initialValues.end), Validators.required],
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
