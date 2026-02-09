// login.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router
import { DataService } from '../../services/userservice/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private dataService = inject(DataService);
  private router = inject(Router); // 2. Inject Router

  onLoginClick(user: string, pass: string) {
    this.dataService.getToken(user, pass).subscribe({
      next: (response) => {
        console.log("Login Success, Token Stored");
        // 3. Navigate to the home page
        this.router.navigateByUrl('/home'); 
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Invalid credentials or Server Error");
      }
    });
  }
}
