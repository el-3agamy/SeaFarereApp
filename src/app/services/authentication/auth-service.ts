import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  isLoggedIn () : boolean {
    const token = localStorage.getItem("seaFarerToken") ;
    return !!token ;
  }
}
