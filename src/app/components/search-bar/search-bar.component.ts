import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
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
  placeHolderColor: string = 'placeholder:text-red-500';
  placeHolderText: string = 'Tracking number';
  isInputError: boolean = false;
  loading: boolean = true;

  /* --------- Output / Onput ---------*/
  @Output() searchContentOutput = new EventEmitter<object>();
  @Input() totalPages: number = 1;
  @Input() selectedMenu: number = 0;

  /* --------- variables---------*/

  // date picker
  minDate: string = ''
  maxDate: string = ''

  // input
  trackingNumber: string = ''
  numberType: number = 0
  dateType: number = 0
  startDate: string = ''
  endDate: string = ''
  sortBy: string = 'new_to_old'

  // pagination
  currentPage = 1;

  // error message and search result
  errorMessage: string = 'Error message'
  searchResult: string = ''


  // dropdown options
  searchDateTypes = [
    { value: 0, viewValue: 'All' },
    { value: 1, viewValue: 'ETD' },
    { value: 2, viewValue: 'ETA' },
  ]

  // dropdown options

  numberTypeOptions = [
    { value: 0, viewValue: 'All Types' },
    { value: 1, viewValue: 'HAWB No.' },
    { value: 2, viewValue: 'MAWB No.' },
    { value: 3, viewValue: 'PO No.' }
  ]

  // dropdown options
  sortByOptions = [
    { value: 'old_to_new', viewValue: 'New to old', icon: 'arrow_downward' },
    { value: 'new_to_old', viewValue: 'Old to new', icon: 'arrow_upward' },
  ]

  // this.selectedMenu
  selectedMenuOptions = [
    { value: 0, viewValue: 'All Cargos' },
    { value: 1, viewValue: 'On-going' },
    { value: 2, viewValue: 'Completed' },
  ]


  // send data
  dataSent: { [key: string]: any } = {}
  initData = {
    "StartDate": this.startDate || null,
    "EndDate": this.endDate || null,
    "Status": this.selectedMenu, // All cargos, on-going, completed
    "DateType": 0, // ETD, ETA
    "NumberType": this.numberTypeOptions[this.numberType].value, // MA, HA, PO...
    "TrackingNo": this.trackingNumber || null,
    "SortBy": this.sortBy,
    "Page": 1,
    "PageSize": 5
  }


  /* --------- functions---------*/

  ngOnInit() {
    this.dataSent = this.initData
    this.searchContentOutput.emit(this.dataSent)

    // within 3 months
    // today
    const today = new Date();
    // three months before
    const threeMonthsBefore = new Date();
    threeMonthsBefore.setMonth(today.getMonth() - 3);

    if (threeMonthsBefore.getDate() !== today.getDate()) {
      threeMonthsBefore.setDate(threeMonthsBefore.getDate() - (threeMonthsBefore.getDate() - 1));
    }



    // earliest of the start date
    threeMonthsBefore.setHours(0, 0, 0, 0);

    // can be seleceted date
    this.minDate = threeMonthsBefore.toISOString().split('T')[0];
    this.maxDate = '';

  }

  // search clicked
  searchClicked() {
    // Date validation
    if ((this.startDate && !this.endDate) || (this.startDate && this.endDate)) {
      const today = new Date();
      const threeMonthsBefore = new Date(today);
      threeMonthsBefore.setMonth(today.getMonth() - 3);

      if (threeMonthsBefore.getDate() !== today.getDate()) {
        threeMonthsBefore.setDate(threeMonthsBefore.getDate() - (threeMonthsBefore.getDate() - 1));
      }

      // +1
      threeMonthsBefore.setDate(threeMonthsBefore.getDate() - 1);
      threeMonthsBefore.setHours(0, 0, 0, 0);

      const startDateObj = this.startDate ? new Date(this.startDate) : null;
      console.log(startDateObj)
      const endDateObj = this.endDate ? new Date(this.endDate) : null;


      if ((startDateObj && startDateObj < threeMonthsBefore) ||
        (endDateObj && endDateObj <= threeMonthsBefore)) {

        const searchStartDate = new Date(threeMonthsBefore);
        searchStartDate.setDate(searchStartDate.getDate() + 1);
        this.searchResult = `
            <div class="w-fit text-red-500 px-2">
            The search range is within the last three months starting from ${searchStartDate.toISOString().split('T')[0]}
            </div>
          `;

        return;
      }
    }
    // Tracking number validation
    if (this.trackingNumber === '' && this.numberType != 0) {
      this.isInputError = true;
      this.searchResult = `
      <div class="w-fit text-red-500 px-2">
      Please enter a tracking number when selecting a number type.
      </div>
    `;
      return;
    }

    this.dataSent = {
      "StartDate": this.startDate || null,
      "EndDate": this.endDate || null,
      "DateType": this.searchDateTypes[this.dateType].value,
      "Status": this.selectedMenu,
      "NumberType": this.numberTypeOptions[this.numberType].value,
      "TrackingNo": this.trackingNumber || null,
      "SortBy": this.sortBy,
      "Page": 1,
      "PageSize": 5
    };
    this.currentPage = 1;
    this.searchResultText();

    this.searchContentOutput.emit(this.dataSent);
  }


  // Search content
  searchResultText() {
    let text = ''

    if (this.trackingNumber !== '') {
      text += `
      <div class="hover:bg-blackColor/5 border rounded-full w-fit border-blackColor/50 px-2 py-[1px]">${this.numberTypeOptions[this.numberType].viewValue} ${this.trackingNumber}</div>
      `
    }

    if (this.startDate !== '' && this.endDate !== '') {
      text += `
      <div class="hover:bg-blackColor/5 border rounded-full w-fit border-blackColor/50 px-2 py-[1px]">${this.startDate} - ${this.endDate}</div>
      `
    }
    // text += `
    // <div class="hover:bg-blackColor/5 border rounded-full w-fit border-blackColor/50 px-2 py-[1px]">Status:${this.selectedMenuOptions[this.selectedMenu].viewValue}</div>
    // `

    this.searchResult = text
    return this.searchResult

  }
  // search clear all
  clearAll() {
    this.searchResult = ''
    this.trackingNumber = ''
    this.numberType = 0
    this.startDate = ''
    this.endDate = ''
    this.sortBy = 'new_to_old'
    this.currentPage = 1;

    this.dataSent = this.initData
    this.dataSent['Status'] = this.selectedMenu
    console.log(this.dataSent)
    this.searchContentOutput.emit(this.dataSent)

  }


  switchStatus(value: string) {
    if (value === 'new_to_old') {
      this.sortBy = 'old_to_new'
    } else {
      this.sortBy = 'new_to_old'
    }
    this.currentPage = 1;

    this.dataSent["Page"] = this.currentPage
    this.dataSent["SortBy"] = this.sortBy

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
      this.dataSent["Page"] = this.currentPage
    } else {
      this.currentPage = 1;
    }
    this.searchContentOutput.emit(this.dataSent);

  }

  renderPage(item: any) {
    const pageNumber = Number(item);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.dataSent["Page"] = this.currentPage
      this.searchContentOutput.emit(this.dataSent);
    } else {
      this.currentPage = 1;
    }
  }

  onPageInputChange(value: string) {
    const filteredValue = value.replace(/\D/g, '');

    const pageNumber = filteredValue ? Number(filteredValue) : 1;
    this.currentPage = pageNumber > this.totalPages ? this.totalPages : pageNumber;
  }


  spinnerAnimation() {
    setTimeout(() => {
      this.loading = false;
    }, 300)
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


