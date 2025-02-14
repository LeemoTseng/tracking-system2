import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../.environments/environment.prod';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipment-other-info-milestones-guest',
  imports: [MatIconModule],
  templateUrl: './shipment-other-info-milestones-guest.component.html',
  styleUrl: './shipment-other-info-milestones-guest.component.css'
})
export class ShipmentOtherInfoMilestonesGuestComponent {

  /*--------- Inject ---------*/
  http = inject(HttpClient);

  /*--------- Style settings ---------*/
  skeletonClass: string = 'w-full h-5 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';



  /*--------- Variables ---------*/

  // skeleton loader
  isSkeletonLoading: boolean = true;

  milestoneCols = ['Order', 'Milestone', 'Date and Time', 'Files']
  flightCols = ['Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
  // dimensionCols =[ 'Length', 'Width', 'Height', 'Pkg Qty', 'VW']

  shipmentData: any = [];
  milestones: any = [];
  dimensions: any = [];
  unit: any = {}

  flightSegments: any = [];

  /*--------- Data import ---------*/

  baseAPI = environment.baseAPI;


  @Input() trackingNo: string = ''

  getMilestonesData(trackingNo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseAPI}TrackingApi/shipmentSummary`, {
      params: new HttpParams().set('trackingNo', trackingNo)
    });
  }


  /*--------- Functions ---------*/

  ngOnInit() {
    this.getMilestonesData(this.trackingNo).subscribe({
      next: (res: any) => {
        // isSkeletonLoading
        this.isSkeletonLoading = false;

        //  milestones
        this.shipmentData = res;

        // flight segments
        this.flightSegments = res.data.FlightSegments;
        this.dimensions = this.objToAry(res.data.ShipmentDetails.Dimensions[0])
        console.log('this.dimensions', this.dimensions)

        this.milestones = this.objToAry(this.shipmentData.data.Milestone); // 要補上 key, value 有額外的內容要篩掉
        this.milestones = this.getMilestoneDateFile(this.milestones) // 要補上 key, value 有額外的內容要篩掉

        this.unit = this.shipmentData.data.ShipmentDetails.Package
        
        // isSkeletonLoading
        this.isSkeletonLoading = false;

      },
      error: (err) => {
        console.log(err);
        this.isSkeletonLoading = false;
      },
      complete: () => { }
    })

  }

  // Obj to Ary
  objToAry(obj: any) {
    if (!obj) return [];
    const ary = Object.entries(obj).map(([key, value]) => ({
      key,
      value
    }));
    return ary;
  }

  // get milestones Date and Time
  getMilestoneDateFile(milestones: any) {
    const newMilestones = milestones.map((item: any) => ({
      name: item.key,
      value: item.value,
      DateTime: this.replaceChineseToEnglish(item.value && item.value.DateTime ? item.value.DateTime : '-'),
      ImageUrls: item.value && item.value.ImageUrls ? item.value.ImageUrls : []
    }));
    return newMilestones;

  }

  // Replace Chinese to number date (YYYY-MM-DD HH:mm format)
  replaceChineseToEnglish(str: string): string {
    if (!str) return str;

    const match = str.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s+(\d{1,2}):(\d{1,2})/);
    if (!match) return str;

    const [, year, month, day, hour, minute] = match.map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    return formattedDate;
  }



}
