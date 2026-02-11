import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SeafarerService {
  private http = inject(HttpClient);
  private baseUrl = 'https://testmobapi.erppluscloud.com';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('seaFarerToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('seaFarerToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  fillEmployee() {
    const url = `${this.baseUrl}/api/POS/FillEmployee?Id=0&text=&Direction=ltr&InCT`;
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  fillVendor() {
    const url = `${this.baseUrl}/api/LegalAffairs/FillVendor?Id=0&text=&Direction=ltr&InCT`;
    return this.http.get<any[]>(url, { headers: this.getAuthHeaders() });
  }

  saveSeafarer(payload: any) {
    const url = `${this.baseUrl}/api/MarineServices/SaveSeafarer?InCT`;
    return this.http.post<any>(url, payload, { headers: this.getHeaders() });
  }

  activateDeactivate(id: number, status: number, empId: number) {
    const url = `${this.baseUrl}/api/MarineServices/ActivateAndInActivateSeafarer?Id=${id}&InCT&Status=${status}&EmpId=${empId}`;
    return this.http.post<any>(url, null, { headers: this.getAuthHeaders() });
  }
}
