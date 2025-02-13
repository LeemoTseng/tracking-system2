import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CubeComponent } from '../../cube/cube.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../.environments/environment.prod';

@Component({
  selector: 'app-shipment-other-info-details',
  imports: [MatListModule, MatIconModule, MatIconModule, CubeComponent, MatTooltipModule],
  templateUrl: './shipment-other-info-details.component.html',
  styleUrl: './shipment-other-info-details.component.css'
})
export class ShipmentOtherInfoDetailsComponent {


  /*--------- Style settings ---------*/



  /*--------- Inject ---------*/
  http = inject(HttpClient);

  /*--------- Variables ---------*/


  // shipmentDataService = inject(ShipmentDataService);
  shipmentData: any = [];
  shipmentDetails: any = [];

  // 3D render
  dimensionX: number = 0;
  dimensionY: number = 0;
  dimensionZ: number = 0;

  // tracking number

  /*--------- Data import ---------*/

  shipmentDataAPI = environment.shipmentDataAPI;
  flightsDataAPI = environment.flightsDataAPI;


  getShipmentData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.shipmentDataAPI}/data`);
  }
  getFlightsData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.flightsDataAPI}/data`);
  }



  /*--------- Functions ---------*/

  ngOnInit() {
    this.getShipmentData().subscribe({
      next: (res) => {
        this.shipmentData = res;
        this.shipmentDetails = this.shipmentData.ShipmentDetails;
        this.dimensionX = this.shipmentDetails.Dimensions[0].Length;
        this.dimensionY = this.shipmentDetails.Dimensions[0].Height;
        this.dimensionZ = this.shipmentDetails.Dimensions[0].Width;
        // console.log(this.shipmentDetails);
      }
    })

  }


  // Copy text 


  copyText(text: string, e: any) {
    if (!text) { return; }

    navigator.clipboard.writeText(text).then(() => {
      console.log(text);
    });

    const copiedElement = e.target.closest('.copyIcon');
    if (!copiedElement || !copiedElement.parentElement) return;

    const copiedMessage = document.createElement('span');
    copiedMessage.textContent = 'Copied!';
    copiedMessage.className = 'absolute inline-block ml-2 px-2 py-1 bg-blackColor/30 bg-opacity-75 text-white rounded text-sm opacity-100 transition-opacity duration-500'

    copiedElement.parentElement.insertBefore(copiedMessage, copiedElement.nextSibling);
    setTimeout(() => {
      copiedMessage.classList.add('opacity-0');
      setTimeout(() => copiedMessage.remove(), 400);
    });
  }


}
