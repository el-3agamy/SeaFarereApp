import { DatePipe, CommonModule } from '@angular/common'; // Add CommonModule
import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from '../popup/popup';
import { UpdateSeafareService } from '../../services/updateSeafare/update-seafare';

@Component({
  selector: 'app-seafarer-card',
  standalone: true,
  imports: [DatePipe, Popup, CommonModule],
  templateUrl: './seafarer-card.html',
  styleUrl: './seafarer-card.css',
})
export class SeafarerCard implements OnInit {
  // Use currentData for everything in the template
  initialInput = input.required<any>( { alias: 'data' }); 
  currentData = signal<any>(null);
  isPopupVisible = signal(false);

  private router = inject(Router);
  private dataService = inject(UpdateSeafareService);

  ngOnInit() {
    this.currentData.set(this.initialInput());
  }

  onAddNewSeafarerClick() {
    this.router.navigateByUrl(`/addnewseafarer`);
  }

  // Just opens the popup
  openEditPopup() {
    this.isPopupVisible.set(true);
  }

  // Called when the popup emits 'updatedData'
  handleUpdate(newData: any) {
    // Merge new fields into old object to keep hidden fields (like Id, EmpId)
    const fullPayload = { ...this.currentData(), ...newData };

    this.dataService.updateSeafare(fullPayload).subscribe({
      next: () => {
        this.currentData.set(fullPayload); // Update view immediately
        this.isPopupVisible.set(false);    // Close popup
      },
      error: (err) => alert("Update failed: " + err.message)
    });
  }
}
