// data.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);

  getToken(username: string, password: string) {
    const body = new HttpParams()
    .set('grant_type', 'password') // Usually 'password' or 'client_credentials'
    .set('username', username)
    .set('password', password);
    const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  }) ;
     return this.http.post<any>('https://testmobapi.erppluscloud.com/token', body, { headers }).pipe(
    tap(response => {
      // API might return 'access_token' instead of 'token'
      const token = response.access_token || response.token;
      if (token) {
        localStorage.setItem("seaFarerToken", token);
        
      }
    })
  ) ;
  }
}
