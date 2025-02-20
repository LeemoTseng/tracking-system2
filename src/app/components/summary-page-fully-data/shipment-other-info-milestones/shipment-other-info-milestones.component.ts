import { Component, inject, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../.environments/environment.prod';

@Component({
  selector: 'app-shipment-other-info-milestones',
  imports: [MatIconModule, MatRipple],
  templateUrl: './shipment-other-info-milestones.component.html',
  styleUrl: './shipment-other-info-milestones.component.css'
})
export class ShipmentOtherInfoMilestonesComponent {

  /*--------- Inject ---------*/
  http = inject(HttpClient);

  /*--------- @Iutput ---------*/
  @Input() trackingNumber: string = '';


  /*--------- Variables ---------*/

  milestoneCols = ['Order', 'Milestone', 'Date and Time', 'Files']
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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = new HttpParams()
      .set('trackingNo', trackingNumber)

    return this.http.get<any[]>(`${this.baseAPI}TrackingApi/milestones`, { headers, params });
  }

  /*--------- Functions ---------*/

  ngOnInit() {
    this.getMilestonesData(this.trackingNumber).subscribe({
      next: (res: any) => {
        this.shipmentData = res.data;
        console.log('shipmentData', this.shipmentData)

        //milestones info
        // this.milestones = this.mapMilestones(this.objToAry(this.shipmentData.Milestone));
        this.milestones = this.aryMilestones(this.shipmentData.Milestones)
        console.log('this.milestones', this.milestones)

        // Flight Info
        if (this.shipmentData.FlightSegments.length > 0) {
          this.flightSegments = this.shipmentData.FlightSegments;
        } else {
          this.flightSegments = []
        }

        // Dimension Info
        if (this.shipmentData.Dimensions.length > 0) {
          this.dimensions = this.objToAry(this.shipmentData.Dimensions[0])
        } else {
          this.dimensions = []
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { }
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

    const list:any = [];

    this.milestonRows.forEach((item: any) => {
      if (milestones.BookingCreation !== null) {
        list.push({
          name: item,
          dateTime: milestones.BookingCreation ? milestones.BookingCreation.DateTime : '-',
          ImageUrls: []
        })
      } else if (milestones.CargoArrive !== null) {
        list.push({
          name: item,
          dateTime: milestones.CargoArrive.DateTime ? milestones.CargoArrive.DateTime : '-',
          ImageUrls: milestones.CargoArrive.ImageUrls ? milestones.CargoArrive.ImageUrls : []
        })
      } else if (milestones.ETD != null) {
        list.push({
          name: item,
          dateTime: milestones.ETD ? milestones.ETD.DateTime : '-',
          ImageUrls: []
        })
      }
      else if (milestones.ATD != null) {
        list.push({
          name: item,
          dateTime: milestones.ATD ? milestones.ATD.DateTime : '-',
          ImageUrls: []
        })
      }
      else if (milestones.ETA != null) {
        list.push({
          name: item,
          dateTime: milestones.ETA ? milestones.ETA.DateTime : '-',
          ImageUrls: []

        })
      }
      else if (milestones.ATA != null) {
        list.push({
          name: item,
          dateTime: milestones.ATA ? milestones.ATA.DateTime : '-',
          ImageUrls: []

        })
      }
      else if (milestones.DocReleaseDate != null) {
        list.push({
          name: item,
          dateTime: milestones.DocReleaseDate ? milestones.DocReleaseDate : '-',
          ImageUrls: []

        })
      }
      else if (milestones.ReleaseDate != null) {
        list.push({
          name: item,
          dateTime: milestones.ReleaseDate ? milestones.ReleaseDate : '-',
          ImageUrls: []

        })
      }
      else if (milestones.AirportPickup != null) {
        list.push({
          name: item,
          dateTime: milestones.AirportPickup ? milestones.AirportPickup.DateTime : '-',
          ImageUrls: milestones.AirportPickup ? milestones.AirportPickup.ImageUrls : []
        })
      }
      else if (milestones.Delivered != null) {
        list.push({
          name: item,
          dateTime: milestones.Delivered ? milestones.Delivered.DateTime : '-',
          ImageUrls: milestones.Delivered ? milestones.Delivered.ImageUrls : []

        })
      }
      else if (milestones.POD != null) {
        list.push({
          name: item,
          dateTime: milestones.POD ? milestones.POD.DateTime : '-',
          ImageUrls: milestones.POD ? milestones.POD.ImageUrls : []

        })
      }
    })
    return list;

  }




  // Cookie
  // get coolies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
