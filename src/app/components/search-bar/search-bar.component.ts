import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from '../../.environments/environment.prod';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, MatRippleModule, MatMenuModule, MatRipple, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  /* --------- Inject ---------*/
  http = inject(HttpClient)



  /* --------- style settings---------*/
  rippleColor: string = 'rgba(255, 255, 255, 0.2)';


  /* --------- Output ---------*/
  @Output() searchContentOutput = new EventEmitter<object>();

  /* --------- variables---------*/

  // data import
  searchDataGuestAPI = environment.baseAPI;


  // input
  trackingNumber: string = ''
  numberType: number = 1
  searchStatus: number = 0
  startDate: string = ''
  endDate: string = ''
  sortBy: string = ''

  // pagination
  currentPage = 1;
  totalPages: number = 20;

  // error message and search result
  errorMessage: string = 'Error message'
  searchResult: string = ''


  // dropdown options
  searchStatusOptions = [
    { value: 0, viewValue: 'All' },
    { value: 1, viewValue: 'ETD' },
    { value: 2, viewValue: 'ETA' },
  ]
  // dropdown options

  numberTypeOptions = [
    { value: 1, viewValue: 'HAWB No.' },
    { value: 2, viewValue: 'MAWB No.' },
    { value: 3, viewValue: 'PO No.' },
    { value: 0, viewValue: 'All' },
  ]

  // dropdown options
  sortByOptions = [
    { value: 'new_to_old', viewValue: 'New to old', icon: 'arrow_downward' },
    { value: 'old_to_new', viewValue: 'Old to new', icon: 'arrow_upward' },
  ]
  // send data

  // dataSent = {
  //   "StartDate": `${this.startDate}`,
  //   "EndDate": `${this.endDate}`,
  //   "DateType": `${this.searchStatusOptions[this.searchStatus].value}`,
  //   "Status": "All", // 未確定傳入是蛇摸資料
  //   "NumberType": `${this.numberTypeOptions[this.numberType].value}`,
  //   "TrackingNo": `${this.trackingNumber}`,
  //   "SortBy": `${this.sortBy}`,
  //   "Page": `${this.currentPage}`,
  //   "PageSize": `${this.totalPages}`
  // }
    dataSent = {
  "StartDate": "2025-02-18",
  "EndDate": "2025-02-18",
  "DateType": 0,
  "Status": "All",
  "NumberType": 0,
  "TrackingNo": "THI012402943",
  "SortBy": "new_to_old",
  "Page": 1,
  "PageSize": 5
}


  /* --------- functions---------*/

  ngOnInit() {
  }

  // search clicked
  searchClicked() {
    this.searchResultText();
    this.searchContentChange();
    this.postSearchData(this.dataSent).subscribe({
      next:(res)=>{
        console.log('res',res)
      },
      error:(err)=>{console.error('err', err)},
      complete:()=>{}
    })


  }


  // Search content
  searchResultText() {
    let text = ''
    if (this.startDate !== '' && this.endDate !== '') {
      text += `<span class="font-bold">Search date</span> ${this.startDate} - ${this.endDate}. `
    }
    if (this.trackingNumber !== '') {
      text += `<span class="font-bold">Tracking Number</span> ${this.trackingNumber}. `
    }
    if (this.numberType !== 0) {
      text += `<span class="font-bold">Number Type</span> ${this.numberTypeOptions[this.numberType].viewValue}. `
    }
    text += `<span class="font-bold">Status</span> ${this.searchStatusOptions[this.searchStatus].viewValue}. `

    this.searchResult = text
    return this.searchResult

  }
  // output search content
  searchContentSend() {
    this.searchContentOutput.emit(this.dataSent)
  }

  postSearchData(searchContent: object): Observable<any[]> {
    return this.http.post<any[]>(`${this.searchDataGuestAPI}TrackingApi/search`, searchContent, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  switchStatus(value: string) {
    if (value === 'new_to_old') {
      this.sortBy = 'old_to_new'
    } else {
      this.sortBy = 'new_to_old'
    }
  }


  searchContentChange() {
    this.searchContentOutput.emit(this.dataSent)
  }

  // Pagination
  get pages(): number[] {
    const maxVisiblePages = 1;
    const pages: number[] = [];

    if (this.totalPages <= maxVisiblePages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(this.currentPage - half, 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = endPage - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }


  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      console.log('Current Page:', this.currentPage);
    }
  }


}


/*{
"StartDate": "2025-02-18",
"EndDate": "2025-02-18",
"DateType": 0,
"Status": "All",
"NumberType": 0,
"TrackingNo": "THI012402943",
"SortBy": "new_to_old",
"Page": 1,
"PageSize": 5
 
}*/


