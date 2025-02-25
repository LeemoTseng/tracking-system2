import { Component, effect, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrackingNumberService } from '../../services/tracking-number.service';
import { FormsModule } from '@angular/forms';
import { ViewDetailsTrackingNumberService } from '../../services/view-details-tracking-number.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../.environments/environment.prod';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-table',
  imports: [MatIconModule, MatTooltipModule, MatRipple, FormsModule, NgClass],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent {


  /*--------- Inject ---------*/
  trackingNumberService = inject(ViewDetailsTrackingNumberService);
  router = inject(Router);
  http = inject(HttpClient)


  /*--------- get data from outter ---------*/
  @Input() selectedMenuInner: string = 'All Cargos';
  @Input() searchContentsData: object = {};
  @Output() totalPages = new EventEmitter<number>();

  /*--------- Variables ---------*/

  // table related
  itemsCols: string[] = ['', 'MAWB No.', 'HAWB No.', 'Milestones', '', '', '', ''];
  allStatus: string[] = ['Booked', 'ETD', 'ATD', 'ETA', 'ATA', 'Completed'];
  lastStatus: string = 'Booked'

  // trackingNumber
  trackingNumber: string = '';

  // firstData
  firstData = {
    "StartDate": "2024-01-01",
    "EndDate": "2024-05-01",
    "DateType": 1,
    "Status": "",
    "NumberType": 0,
    "TrackingNo": "",
    "SortBy": "new_to_old",
    "Page": 2,
    "PageSize": 5
  }

  totalPage:number = 0;

  // Variables
  isInit: boolean = false;


  /*--------- Data import ---------*/

  items: any[] = [
    { nowStatus: 'Completed' }, { nowStatus: 'ATD' }
  ]

  shipmentList: any[] = []

  // data import
  searchDataGuestAPI = environment.baseAPI;


  /*--------- Functions ---------*/

  ngOnInit() {
    this.renderItems(this.firstData);
    console.log('this.firstData',this.firstData)
    this.isInit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isInit) return;
    // if (changes['selectedMenuInner']) {
    //   this.renderItems(this.searchContentsData);
    //   console.log('this.renderItems',this.searchContentsData)
    // }
    if (changes['searchContentsData']) {
      console.log('this.renderItems',this.searchContentsData)
      this.renderItems(this.searchContentsData);

    }
  }

  // render 
  renderItems(obj: {}) {
    console.log('obj', obj)
    this.postSearchData(obj).subscribe({
      next: (res) => {
        console.log('res', res)
        this.shipmentList = res.data.Shipments;
        this.totalPage = res.data.TotalCount;
        this.totalPages.emit(this.totalPage);

      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => { }
    });

    // 根據selectedMenuInner去render對應的items
    /* 處理資料：
      1. nowStatus要處理為六個狀態
      2. 檢查是否要轉換成陣列？
      3. get data functions
    */
  }


  postSearchData(searchContent: object): Observable<any> {
    const token = this.getCookie('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any[]>(
      `${this.searchDataGuestAPI}TrackingApi/search`,
      searchContent,
      { headers }
    );
  }


  // Output send



  // view items
  //Click and view the details of the item

  viewItemBtn(trackingNumber: string) {
    this.trackingNumberService.setData(trackingNumber);
    this.router.navigate(['/shipment-summary']);
  }


  // table items
  findNowStatusIndex(allStatus: string[], nowStatus: string): number {
    return allStatus.indexOf(nowStatus);
  }

  // Cookie
  // get coolies
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }


  // Status class implementation
  getStatusClass(MilestoneNode: string, nowStatus: string): any {

    if (MilestoneNode === 'Pod') {
      return "bg-primary"
    }
    if (MilestoneNode === 'ATA') {
      if (nowStatus === 'Completed') {
        return "bg-gray-300"
      } else {
        return "bg-primary"
      }
    }
    if (MilestoneNode === 'ETA') {
      if (nowStatus === 'Completed' || nowStatus === 'ATA') {
        return "bg-gray-300"
      } else {
        return "bg-primary"
      }

    }

  }
  getLineClass(MilestoneNode: string, nowStatus: string): any {

    if (MilestoneNode === 'Pod') {
      return "text-primary"
    }
    if (MilestoneNode === 'ATA') {
      if (nowStatus === 'Completed') {
        return "text-gray-300"
      } else {
        return "text-primary"
      }
    }
    if (MilestoneNode === 'ETA') {
      if (nowStatus === 'Completed' || nowStatus === 'ATA') {
        return "text-gray-300"
      } else {
        return "text-primary"
      }

    }
  }




}
