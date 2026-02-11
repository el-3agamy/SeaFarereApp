// update-seafare.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateSeafareService {
  private http = inject(HttpClient);

  updateSeafare(seafarerData: any) {
    // 1. Get token from storage
    const token = localStorage.getItem('seaFarerToken');

    // 2. Set Authorization headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // 3. Construct URL
    const url = `https://testmobapi.erppluscloud.com/api/MarineServices/SaveSeafarer?InCT`;

    // 4. Send the data object as the POST body
    return this.http.post<any>(url, seafarerData, { headers });
  }
}
