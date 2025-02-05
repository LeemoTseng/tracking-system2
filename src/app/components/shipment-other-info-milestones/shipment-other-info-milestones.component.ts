import { Component, inject } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentDataService } from '../../services/shipment-data.service';
import { pipe } from 'rxjs';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-shipment-other-info-milestones',
  imports: [MatIconModule, MatRipple, TitleCasePipe],
  templateUrl: './shipment-other-info-milestones.component.html',
  styleUrl: './shipment-other-info-milestones.component.css'
})
export class ShipmentOtherInfoMilestonesComponent {

  /*--------- Variables ---------*/
  shipmentDataService = inject(ShipmentDataService);
  milestoneCols = ['Order', 'Milestone', 'Date and Time', 'Files']
  flightCols = ['Order', 'Flight No.', 'From', 'To', 'ETD', 'ATD', 'ETA', 'ATA']
  // dimentionCols =[ 'Length', 'Width', 'Height', 'Pkg Qty', 'VW']

  /*--------- Data import ---------*/
  shipmentData: any = [];
  milestones: any = [];
  dimentions: any = [];
  unit:any = {}


  /*--------- Functions ---------*/

  ngOnInit() {
    this.shipmentDataService.getShipmentData().subscribe({
      next: (res) => {
        this.shipmentData = res;
        console.log(this.shipmentData)
        // console.log(this.shipmentData.Milestone)
        this.milestones = this.objToAry(this.shipmentData.Milestone);
        this.milestones = this.getMilestoneDateFile(this.milestones)
        this.dimentions = this.objToAry(this.shipmentData.ShipmentDetails.Dimensions[0])
        this.unit = this.shipmentData.ShipmentDetails.Package
        console.log('unit',this.unit)
        // console.log('dimentions',this.dimentions)
        console.log(this.milestones)
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

  // Replace Chinese to English
  replaceChineseToEnglish(str: string): string {
    if (!str) return str;
    const match = str.match(/(\d{4})年(\d{1,2})月(\d{1,2})日\s+(\d{1,2}):(\d{1,2})/);
    if (!match) return str;
    const [, year, month, day, hour, minute] = match.map(Number);
    const date = new Date(year, month - 1, day, hour, minute);

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24小時制
    }).format(date);
  }

}
