// home.component.ts
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import this for Pipes
import { GetAllSeafarersService } from '../../services/getAllSeafarers/get-all-seafarers-service';
import { SeafarerCard } from "../../shared/seafarer-card/seafarer-card";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SeafarerCard], 
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seafarerService = inject(GetAllSeafarersService);
  seaFarers = signal<any[]>([]);

  ngOnInit() {
    this.seafarerService.getAllSeafarers().subscribe({
      next: (data) => this.seaFarers.set(data),
      error: (err) => console.error("Could not load seafarers", err)
    });
  }
}

