import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../.environments/environment.prod';

@Component({
  selector: 'app-shipment-details',
  imports: [MatIconModule, MatRippleModule, CommonModule],
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.css'
})
export class ShipmentDetailsComponent {

  /*--------- Inject ---------*/
  http = inject(HttpClient)



  /*------- style settings -------*/
  rippleColor: string = 'rgba(0, 0, 0, 0.1)';

  /*------- Variables -------*/

  // skeleton loader
  isSkeletonLoading: boolean = true;

  processList: any = [
    {
      "title": "Booking Creation",
      "icon": "inventory",
    },
    {
      "title": "ETD",
      "icon": "package_2"

    },
    {
      "title": "ATD",
      "icon": "box"
    },
    {
      "title": "ETA",
      "icon": "flight_land"
    },
    {
      "title": "ATA",
      "icon": "event_available"
    },
  ]
  shipmentDataAPI = environment.shipmentDataAPI;
  flightsDataAPI = environment.flightsDataAPI;
  // shipmentDataService = inject(ShipmentDataService);

  /*------- Data import -------*/

  shipmentData: any = [];
  shipmentInfo: any = {};
  milestones: any = {};

  processTimeList: any = []
  lastStatus: string = ''

  lastTime: Date = new Date()
  isCompleted: boolean = false



  getShipmentData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.shipmentDataAPI}/data`);
  }

  getFlightsData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.flightsDataAPI}/data`);
  }

  /*------- Functions -------*/

  ngOnInit() {

    // Get shipment data
    this.getShipmentData().subscribe({
      next: (res) => {
        this.shipmentData = res,
          this.shipmentInfo = this.shipmentData.ShipmentInfo,
          this.milestones = this.shipmentData.Milestone
        this.processListData();
        this.setStatusAndTimeAry(this.milestones)
        this.setLastStatus(this.processTimeList)

        this.isSkeletonLoading = false;

      },
      error: (error) => { 
        console.log('error', error) 
        this.isSkeletonLoading = false;
      },
      complete: () => { }
    });
  }



  // Import data from shipment-data.service.ts
  processListData() {
    this.processList.forEach((item: any) => {
      if (item.title === 'Booking Creation') {
        item.dateTime = this.replaceChineseToEnglish(this.milestones.BookingCreation)
      } else if (item.title === 'ETD') {
        item.dateTime = this.replaceChineseToEnglish(this.milestones.ETD.DateTime)
        item.originCode = this.milestones.ETD.OriginCode
        item.destCode = this.milestones.ETD.DestCode
        item.flightNo = this.milestones.ETD.FlightNo
      } else if (item.title === 'ATD') {
        item.dateTime = this.replaceChineseToEnglish(this.milestones.ATD.DateTime)
        item.imgUrls = this.milestones.ATD.ImageUrls
      } else if (item.title === 'ETA') {
        item.dateTime = this.replaceChineseToEnglish(this.milestones.ETA.DateTime)
        item.originCode = this.milestones.ETA.OriginCode
        item.destCode = this.milestones.ETA.DestCode
        item.flightNo = this.milestones.ETA.FlightNo
      } else if (item.title === 'ATA') {
        item.dateTime = this.replaceChineseToEnglish(this.milestones.ATA.DateTime)
        item.imgUrls = this.milestones.ATA.ImageUrls
      }
    }

    );
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

  // set status and time array
  setStatusAndTimeAry(milestones: any) {

    if (!milestones) return;
    // set time
    if (milestones.ATA.DateTime) {
      let ataTime5days = new Date(this.replaceChineseToEnglish(milestones.ATA.DateTime))
      ataTime5days.setDate(ataTime5days.getDate() + 5)
      this.processTimeList.unshift({
        status: 'ATA',
        dateTime: ataTime5days
      })
    }
    if (milestones.ATD.DateTime) {
      let atdTime = new Date(this.replaceChineseToEnglish(milestones.ATD.DateTime))
      this.processTimeList.unshift({
        status: 'ATD',
        dateTime: atdTime
      })
    }
    if (milestones.AirportPickup.DateTime) {
      let airportPickupTime3days = new Date(this.replaceChineseToEnglish(milestones.AirportPickup.DateTime))
      airportPickupTime3days.setDate(airportPickupTime3days.getDate() + 3)
      this.processTimeList.unshift({
        status: 'AirportPickup',
        dateTime: airportPickupTime3days
      })
    }
    if (milestones.Delivered.DateTime) {
      const deliveredTime2days = new Date(this.replaceChineseToEnglish(milestones.Delivered.DateTime))
      deliveredTime2days.setDate(deliveredTime2days.getDate() + 2)
      this.processTimeList.unshift({
        status: 'Delivered',
        dateTime: deliveredTime2days
      })
    }
    if (milestones.ETA.DateTime) {
      const etaTime = new Date(this.replaceChineseToEnglish(milestones.ETA.DateTime))
      this.processTimeList.unshift({
        status: 'ETA',
        dateTime: etaTime
      })
    }
    if (milestones.ETD.DateTime) {
      const etdTime = new Date(this.replaceChineseToEnglish(milestones.ETD.DateTime))
      this.processTimeList.unshift({
        status: 'ETD',
        dateTime: etdTime
      })
    }
    if (milestones.POD) {
      const podTime = new Date(this.replaceChineseToEnglish(milestones.POD))
      this.processTimeList.unshift({
        status: 'POD',
        dateTime: podTime
      })
    }
  }

  // set the last status
  setLastStatus(processTimeList: any) {
    if (!processTimeList || processTimeList.length === 0) return;

    const nowTime = new Date().getTime();
    let closestPast: any = '';

    // From the latest to the oldest
    for (let i = processTimeList.length - 1; i >= 0; i--) {
      const item = processTimeList[i];
      const eventTime = new Date(item.dateTime).getTime();

      if (eventTime < nowTime) {
        closestPast = item;
        break;
      }
    }

    if (closestPast) {
      if (
        closestPast.status === 'AirportPickup' ||
        closestPast.status === 'Delivered' ||
        closestPast.status === 'POD'
      ) { closestPast.status === 'ATA' }
      this.lastStatus = closestPast.status;
      this.lastTime = closestPast.dateTime;
    }
  }

  // Status class implementation
  getStatusClass(title: string): string {
    const completedStatuses = ["Booking Creation", "ETD", "ATD", "ETA", "ATA"];

    // 1️若 `title` 與 `lastStatus` 完全相同，則標記為 `primary`
    if (this.lastStatus === title) {
      return "text-primary";
    }

    // 2️只允許特定狀態變成 `text-primary`
    const allowedPairs: { [key: string]: string[] } = {
      "Booking Creation": ["Booking Creation"],
      "ETD": ["Booking Creation", "ETD"],
      "ATD": ["Booking Creation", "ETD", "ATD"],
      "ETA": ["Booking Creation", "ETD", "ATD", "ETA"],
      "ATA": ["Booking Creation", "ETD", "ATD", "ETA", "ATA"]
    };

    if (allowedPairs[this.lastStatus as keyof typeof allowedPairs]?.includes(title)) {
      return "text-primary";
    }
    return "text-blackColor/40";
  }

  getLineClass(title: string): string {
    const completedStatuses = ["Booking Creation", "ETD", "ATD", "ETA", "ATA"];

    // 1️⃣ 若 `title` 與 `lastStatus` 完全相同，則標記為 `bg-primary`
    if (this.lastStatus === title) {
      return "bg-primary";
    }

    // 2️⃣ 只允許特定狀態變成 `bg-primary`
    const allowedPairs: { [key: string]: string[] } = {
      "Booking Creation": ["Booking Creation"],
      "ETD": ["Booking Creation", "ETD"],
      "ATD": ["Booking Creation", "ETD", "ATD"],
      "ETA": ["Booking Creation", "ETD", "ATD", "ETA"],
      "ATA": ["Booking Creation", "ETD", "ATD", "ETA", "ATA"]
    };

    if (allowedPairs[this.lastStatus]?.includes(title)) {
      return "bg-primary";
    }

    // 3️⃣ 其他情況顯示 `bg-blackColor/40`
    return "bg-blackColor/40";
  }



}