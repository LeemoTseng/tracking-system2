import { Component, inject } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentDataService } from '../../services/shipment-data.service';
import { Observable, pipe } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { CubeComponent } from '../cube/cube.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-shipment-other-info-milestones',
  imports: [MatIconModule, MatRipple],
  templateUrl: './shipment-other-info-milestones.component.html',
  styleUrl: './shipment-other-info-milestones.component.css'
})
export class ShipmentOtherInfoMilestonesComponent {

  /*--------- Inject ---------*/
  http = inject(HttpClient);


  /*--------- Variables ---------*/

  milestoneCols = ['Order', 'Milestone', 'Date and Time', 'Files']
  flightCols = ['Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
  // dimensionCols =[ 'Length', 'Width', 'Height', 'Pkg Qty', 'VW']

  shipmentData: any = [];
  milestones: any = [];
  dimensions: any = [];
  unit: any = {}

  flightSegments: any = [];

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
    this.getFlightsData().subscribe({
      next: (res: any) => {
        this.flightSegments = res.FlightSegments;
        this.dimensions = this.objToAry(res.Dimensions[0])
      },
      error: (err) => { console.log(err) },
      complete: () => { }
    })

    this.getShipmentData().subscribe({
      next: (res) => {
        this.shipmentData = res;
        this.milestones = this.objToAry(this.shipmentData.Milestone);
        this.milestones = this.getMilestoneDateFile(this.milestones)
        this.unit = this.shipmentData.ShipmentDetails.Package
      }
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
