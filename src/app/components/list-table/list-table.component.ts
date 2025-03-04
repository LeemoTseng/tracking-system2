import { Component, effect, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
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

  // Style
  isSkeletonLoading: boolean = true;
  skeletonClass: string = 'w-full h-10 rounded bg-gradient-to-r from-gray-50 via-gray-100 to-gray-0 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]';

  // table related
  itemsCols: string[] = ['', 'MAWB No.', 'HAWB No.', 'Milestones', '', '', '', ''];
  allStatus: string[] = ['Booked', 'ETD', 'ATD', 'ETA', 'ATA', 'Completed'];
  lastStatus: string = 'Booked'

  // trackingNumber
  trackingNumber: string = '';

  // pagination

  totalPage: number = 0;
  currentPage: number = 1;

  // Variables
  isInit: boolean = false;
  hasData: boolean = false;


  /*--------- Data import ---------*/

  items: any[] = [
    { nowStatus: 'Completed' }, { nowStatus: 'ATD' }
  ]

  shipmentList: any[] = []

  // data import
  searchDataGuestAPI = environment.baseAPI;


  /*--------- Functions ---------*/

  ngOnInit() {
    console.log('list-table/ngOnInit()', this.searchContentsData)
    this.renderItems(this.searchContentsData);
    // console.log('this.initData', this.initData)
    this.isInit = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isInit) return;
    if (changes['selectedMenuInner']) {
      this.renderItems(this.searchContentsData);
    }
    if (changes['searchContentsData']) {
      this.renderItems(this.searchContentsData);
      console.log('list-table/this.renderItems', this.searchContentsData)
    }
  }

  // render 
  renderItems(obj: any) {
    console.log('list-table/renderItems(obj: any)', obj.Page)
    this.currentPage = obj.Page;
    this.isSkeletonLoading = true;
    this.postSearchData(obj).subscribe({
      next: (res) => {

        if (res.code == 1) {
          this.hasData = true;
          this.shipmentList = res.data.Shipments;
          if (this.shipmentList.length === 0) {
            this.hasData = false;
            this.isSkeletonLoading = false;
          }else{
          this.totalPage = res.data.TotalPages;
          this.totalPages.emit(this.totalPage);
          this.isSkeletonLoading = false}
        } else {
          console.log('has no data')
          this.isSkeletonLoading = false
          this.hasData = false;
        }


      },
      error: (err) => {
        console.log('has no data')
        this.isSkeletonLoading = false
        this.hasData = false;
        this.isSkeletonLoading = false

      },
      complete: () => { }
    });
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
  getTextClass(MilestoneNode: string, nowStatus: string): any {

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
