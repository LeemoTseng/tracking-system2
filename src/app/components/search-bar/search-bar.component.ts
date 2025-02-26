import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, MatRippleModule, MatMenuModule, MatRipple, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  /* --------- Inject ---------*/


  /* --------- style settings---------*/
  rippleColor: string = 'rgba(255, 255, 255, 0.2)';


  /* --------- Output / Onput ---------*/
  @Output() searchContentOutput = new EventEmitter<object>();
  @Input() totalPages: number = 1;

  /* --------- variables---------*/


  // input
  trackingNumber: string = ''
  numberType: number = 1
  searchStatus: number = 0
  startDate: string = ''
  endDate: string = ''
  sortBy: string = 'new_to_old'

  // pagination
  currentPage = 1;
  // totalPages: number = 5;

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
    { value: 0, viewValue: 'All' },
    { value: 1, viewValue: 'HAWB No.' },
    { value: 2, viewValue: 'MAWB No.' },
    { value: 3, viewValue: 'PO No.' }
  ]

  // dropdown options
  sortByOptions = [
    { value: 'old_to_new', viewValue: 'New to old', icon: 'arrow_downward' },
    { value: 'new_to_old', viewValue: 'Old to new', icon: 'arrow_upward' },
  ]

  // send data
  dataSent = {}


  /* --------- functions---------*/

  ngOnInit() {
  }

  // search clicked
  searchClicked() {

    this.dataSent = {
      /**------ 測試完記得解除註解 --------- */
      "StartDate": this.startDate || null,
      "EndDate": this.endDate || null,
      // "DateType": this.searchStatusOptions[this.searchStatus].value,
      "DateType": 1,
      "Status": 0,
      "NumberType": this.numberTypeOptions[this.numberType].value,
      "TrackingNo": this.trackingNumber || null,
      "SortBy": this.sortBy,
      "Page": 1,
      "PageSize": 5
      /**--------------------- */


      /* ------ 測試用 --------- */

      // "StartDate": "2025-01-01",
      // "EndDate": "2025-02-28",
      // "DateType": 1,
      // "Status": 0,
      // "NumberType": 0,
      // "TrackingNo": "456",
      // "SortBy": "new_to_old",
      // "Page": 1,
      // "PageSize": 5

      /**--------------------- */

    };

    this.currentPage = 1;
    this.searchResultText();

    // send data to shipment-list
    this.searchContentOutput.emit(this.dataSent)

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



  switchStatus(value: string) {
    this.dataSent = {
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      // "DateType": this.searchStatusOptions[this.searchStatus].value,
      // "DateType": 1,
      "Status": 0,
      "NumberType": this.numberTypeOptions[this.numberType].value,
      "TrackingNo": this.trackingNumber,
      "SortBy": this.sortBy,
      "Page": 1,
      "PageSize": 5
    };
    if (value === 'new_to_old') {
      this.sortBy = 'old_to_new'
    } else {
      this.sortBy = 'new_to_old'

    }
    this.currentPage = 1;

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
    } else {
      this.currentPage = 1; // 輸入超過就會回到第一頁
    }

    this.dataSent = {
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "Status": 0,
      "NumberType": this.numberTypeOptions[this.numberType].value,
      "TrackingNo": this.trackingNumber,
      "SortBy": this.sortBy,
      "Page": this.currentPage,
      "PageSize": 5
    };
    this.searchContentOutput.emit(this.dataSent);
  }


  renderPage(item: any) {
    const pageNumber = Number(item); // 確保轉換為數字
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    } else {
      this.currentPage = 1;
    }

    this.dataSent = {
      "StartDate": this.startDate,
      "EndDate": this.endDate,
      "Status": 0,
      "NumberType": this.numberTypeOptions[this.numberType].value,
      "TrackingNo": this.trackingNumber,
      "SortBy": this.sortBy,
      "Page": this.currentPage,
      "PageSize": 5
    };

    this.searchContentOutput.emit(this.dataSent);
  }

  onPageInputChange(value: string) {
    const filteredValue = value.replace(/\D/g, '');

    const pageNumber = filteredValue ? Number(filteredValue) : 1;

    this.currentPage = pageNumber > this.totalPages ? this.totalPages : pageNumber;
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


