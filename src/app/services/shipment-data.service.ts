import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentDataService {
  // constructor(private http: HttpClient) {}

  
  /*--------- Variables ---------*/
  shipmentDataAPI = environment.shipmentDataAPI;


  /*--------- Inject ---------*/
  http = inject(HttpClient)


  /*--------- Functions ---------*/
  getShipmentData(): Observable<any[]> {
    return this.http.get<any[]>(this.shipmentDataAPI);
  }




}
