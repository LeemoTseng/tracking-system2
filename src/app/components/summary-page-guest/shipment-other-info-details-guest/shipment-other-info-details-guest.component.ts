import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../.environments/environment.prod';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CubeComponent } from '../../cube/cube.component';

@Component({
  selector: 'app-shipment-other-info-details-guest',
  imports: [MatIconModule, CubeComponent],
  templateUrl: './shipment-other-info-details-guest.component.html',
  styleUrl: './shipment-other-info-details-guest.component.css'
})
export class ShipmentOtherInfoDetailsGuestComponent {


  /*--------- Style settings ---------*/
  rippleColor: string = 'rgba(0, 0, 0, 0.1)';
  skeletonClass: string = 'w-full h-5 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';



  /*--------- Inject ---------*/
  http = inject(HttpClient);

  /*--------- Variables ---------*/

  // skeleton loader
  isSkeletonLoading: boolean = true;



  // shipmentDataService = inject(ShipmentDataService);
  shipmentData: any = [];
  shipmentDetails: any = [];

  // 3D render
  dimensionX: number = 0;
  dimensionY: number = 0;
  dimensionZ: number = 0;

  // tracking number

  /*--------- Data import ---------*/

  summaryDataGuestAPI = environment.baseAPI;

  trackingNo: string = 'TECSHA126236';
  getSummaryData(trackingNo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.summaryDataGuestAPI}TrackingApi/shipmentSummary`, {
      params: new HttpParams().set('trackingNo', trackingNo)
    });
  }


  /*--------- Functions ---------*/

  ngOnInit() {
    this.getSummaryData(this.trackingNo).subscribe({
      next: (res) => {
        this.shipmentData = res;
        console.log(this.shipmentData)

        this.shipmentDetails = this.shipmentData.data.ShipmentDetails;
        console.log('this.shipmentDetails', this.shipmentDetails)
        this.dimensionsApplied(this.shipmentDetails.Dimensions)
        // console.log(this.shipmentDetails);
        setTimeout(() => {
          this.isSkeletonLoading = false;
        },1000)

      },
      error: (err) => {
        console.log(err);
        this.isSkeletonLoading = false;

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

  // dimensions

  dimensionsApplied(dimensionAry:any) {
    if (dimensionAry.length > 0) {
      this.dimensionX = dimensionAry[0].Length;
      this.dimensionY = dimensionAry[0].Height;
      this.dimensionZ = dimensionAry[0].Width;
    }

  }




}
