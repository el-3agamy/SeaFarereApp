import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAllSeafarersService {
  private http = inject(HttpClient)
  getAllSeafarers(){

    const token = localStorage.getItem("seaFarerToken") ;
    const headers =  new HttpHeaders({
      'Authorization': `Bearer ${token}` ,
    }) ;

    const url = `https://testmobapi.erppluscloud.com/api/MarineServices/GetAllSeafarers?Direction=ltr&InCT`
    return this.http.get<any[]>(url , {headers})
  }
}
