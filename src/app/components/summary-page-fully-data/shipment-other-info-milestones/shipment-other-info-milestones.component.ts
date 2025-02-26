import { Component, inject, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../.environments/environment.prod';

@Component({
  selector: 'app-shipment-other-info-milestones',
  imports: [MatIconModule, MatRipple],
  templateUrl: './shipment-other-info-milestones.component.html',
  styleUrl: './shipment-other-info-milestones.component.css'
})
export class ShipmentOtherInfoMilestonesComponent {

  /*--------- style settings ---------*/
  skeletonClass: string = 'w-full h-5 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';

  /*--------- Inject ---------*/
  http = inject(HttpClient);

  /*--------- @Iutput ---------*/
  // @Input() trackingNumber: string = '';
  trackingNumber: string = 'THI132400003'; // 測試用


  /*--------- Variables ---------*/

  // skeleton loader
  isSkeletonLoading: boolean = true;

  //data
  milestoneCols = ['', 'Milestone', 'Date and Time', 'Files']
  milestonRows = [
    'Booking Creation', 'Cargo Arrive Terminal', 'ETD', 'ATD', 'ETA', 'ATA', 'Document Release', 'Release', 'Airport Pickup', 'Delivered', 'POD'];
  milestoneColsGuest = ['Order', 'Milestone', 'Date and Time', 'Files']
  flightCols = ['', 'Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
  // dimensionCols =[ 'Length', 'Width', 'Height', 'Pkg Qty', 'VW']

  shipmentData: any = [];
  milestones: any = [];
  dimensions: any = [];
  unit: any = {}

  flightSegments: any = [];

  /*--------- Data import ---------*/

  baseAPI = environment.baseAPI;

  // get milestones Date and Time
  getMilestonesData(trackingNumber: string): Observable<any[]> {
    const token = this.getCookie('authToken');

    if (!token) {
      console.error('No auth token found');
      return throwError(() => new Error('No auth token found'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams().set('trackingNo', trackingNumber);

    return this.http.get<any[]>(`${this.baseAPI}TrackingApi/milestones`, { headers, params });
  }


  /*--------- Functions ---------*/

  ngOnInit() {
    this.getMilestonesData(this.trackingNumber).subscribe({
      next: (res: any) => {
        this.shipmentData = res.data;
        console.log('shipmentData', this.shipmentData)

        this.milestones = this.aryMilestones(this.shipmentData.Milestone);

        // Flight Info
        if (this.shipmentData.FlightSegments.length > 0) {
          this.flightSegments = this.shipmentData.FlightSegments;
        } else {
          this.flightSegments = []
        }

        // Dimension Info

        if (this.shipmentData.Dimensions !== null) {
          this.dimensions = this.objToAry(this.shipmentData.Dimensions[0])
        } else {
          this.dimensions = []
        }
        this.isSkeletonLoading = false;


      },
      error: (err) => {
        console.log(err);
        this.isSkeletonLoading = false;
      },
      complete: () => { this.isSkeletonLoading = false }
    })

  }

  // Obj to Ary
  objToAry(obj: any) {
    const ary = Object.entries(obj).map(([key, value]) => ({
      key,
      value
    }));
    return ary;
  }




  aryMilestones(milestones: any) {
    // 'Booking Creation', 'Cargo Arrive Terminal', 'ETD', 'ATD', 'ETA', 'ATA', 'Document Release', 'Release', 'Airport Pickup', 'Delivered', 'POD'];

    const list: any = [];
    console.log('other-info-milestones', milestones)

    this.milestonRows.forEach((row: any) => {
      if (row === 'Booking Creation') {
        list.push({
          Milestone: row,
          DateTime: milestones?.BookingCreation ?? '',
          Imgs: [],
        });
      }
      else if (row === 'Cargo Arrive Terminal') {
        list.push({
          Milestone: row,
          DateTime: milestones?.CargoArrive?.DateTime ?? '',
          Imgs: milestones?.CargoArrive?.ImageUrls ?? [],
        });
      }
       else if (row === 'ETD') {
        list.push({
          Milestone: row,
          DateTime: milestones?.ETD ?? '',
          Imgs: [],
        });
      }
      else if (row === 'ATD') {
        list.push({
          Milestone: row,
          DateTime: milestones?.ATD ?? '',
          Imgs: [],
        });
      }
      else if (row === 'ETA') {
        list.push({
          Milestone: row,
          DateTime: milestones?.ETA ?? '',
          Imgs: [],
        });
      }
      else if (row === 'ATA') {
        list.push({
          Milestone: row,
          DateTime: milestones?.ATA ?? '',
          Imgs: [],
        });
      }
      else if (row === 'Document Release') {
        if (milestones.DocReleaseDate != null && milestones.DocReleaseDate != '' && milestones.DocReleaseDate != 'undefined') {
          list.push({
            Milestone: row,
            DateTime: milestones?.DocReleaseDate ?? '',
            Imgs: [],
          });
        }
      }
      else if (row === 'Release') {
        if (milestones.ReleaseDate != null && milestones.ReleaseDate !=''&& milestones.ReleaseDate !='undefined' ) {
          list.push({
            Milestone: row,
            DateTime: milestones?.ReleaseDate ?? '',
            Imgs: [],
          });
        }
      }
      else if (row === 'Airport Pickup') {
        list.push({
          Milestone: row,
          DateTime: milestones?.AirportPickup?.DateTime ?? '',
          Imgs: milestones?.AirportPickup?.ImageUrls ?? [],
        });
      }
      else if (row === 'Delivered') {
        list.push({
          Milestone: row,
          DateTime: milestones?.Delivered?.DateTime ?? '',
          Imgs: milestones?.Delivered?.ImageUrls ?? [],
        });
      }
      else if (row === 'POD') {
        list.push({
          Milestone: row,
          DateTime: milestones?.Pod?.DateTime ?? '',
          Imgs: milestones?.Pod?.ImageUrls ?? [],
        });
      }
    });


    return list;

  }


  // Cookie
  // get coolies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
