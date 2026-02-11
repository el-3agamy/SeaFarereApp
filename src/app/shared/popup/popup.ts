import { Component, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css'
})
export class Popup implements OnInit {
  private fb = inject(FormBuilder);
  
  // Inputs & Outputs
  initialData = input.required<any>();
  close = output<void>();
  updatedData = output<any>();

  editForm!: FormGroup;

  ngOnInit() {
    // Initialize form with existing data
    this.editForm = this.fb.group({
      Id: [this.initialData().Id],
      EmployeeName: [this.initialData().EmployeeName],
      Phone: [this.initialData().Phone],
      Email: [this.initialData().Email],
      JobName: [this.initialData().JobName],
      // Add other fields as needed
    });
  }

  onSave() {
    if (this.editForm.valid) {
      this.updatedData.emit(this.editForm.value);
    }
  }
}
