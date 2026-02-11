import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GetAllSeafarersService } from '../../services/getAllSeafarers/get-all-seafarers-service';
import { SeafarerService } from '../../services/seafarer/seafarer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seafarerService = inject(GetAllSeafarersService);
  private actionService = inject(SeafarerService);
  private router = inject(Router);

  seaFarers = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadSeafarers();
  }

  loadSeafarers() {
    this.isLoading.set(true);
    this.seafarerService.getAllSeafarers().subscribe({
      next: (data) => {
        this.seaFarers.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Could not load seafarers', err);
        this.isLoading.set(false);
      }
    });
  }

  onAddNew() {
    this.router.navigateByUrl('/addnewseafarer');
  }

  onEdit(item: any) {
    this.router.navigate(['/editseafarer', item.Id]);
  }

  onActivate(item: any) {
    this.actionService.activateDeactivate(item.Id, 1, item.EmpId || 1).subscribe({
      next: () => {
        this.loadSeafarers();
      },
      error: (err) => console.error('Activate failed', err)
    });
  }

  onDeactivate(item: any) {
    this.actionService.activateDeactivate(item.Id, 2, item.EmpId || 1).subscribe({
      next: () => {
        this.loadSeafarers();
      },
      error: (err) => console.error('Deactivate failed', err)
    });
  }

  onLogout() {
    localStorage.removeItem('seaFarerToken');
    this.router.navigateByUrl('/login');
  }
}
