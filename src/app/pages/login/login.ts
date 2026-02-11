import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/userservice/user-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private dataService = inject(DataService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');

  onLoginClick(user: string, pass: string) {
    if (!user || !pass) {
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.dataService.getToken(user, pass).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Invalid credentials or server error. Please try again.');
        console.error('Login failed:', err);
      }
    });
  }
}
