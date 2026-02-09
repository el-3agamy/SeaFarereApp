import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seafarer-card',
  imports: [DatePipe],
  templateUrl: './seafarer-card.html',
  styleUrl: './seafarer-card.css',
})
export class SeafarerCard {
  data = input.required<any>() ;
  private router = inject(Router);
  onAddNewFarerClick(){
      this.router.navigateByUrl(`/addnewseafarer`) ;
  }
}
