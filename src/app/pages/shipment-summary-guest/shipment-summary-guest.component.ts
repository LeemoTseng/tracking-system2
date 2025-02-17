import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ShipmentDetailsGuestComponent } from '../../components/summary-page-guest/shipment-details-guest/shipment-details-guest.component';
import { ShipmentOtherInfoGuestComponent } from '../../components/summary-page-guest/shipment-other-info-guest/shipment-other-info-guest.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';
import { TrackingNumberService } from '../../services/tracking-number.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../.environments/environment.prod';
import { Observable } from 'rxjs';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-shipment-summary-guest',
  imports: [RouterOutlet, FooterComponent, ShipmentDetailsGuestComponent,
    ShipmentOtherInfoGuestComponent, MatIconModule, HeaderComponent, FormsModule, MatRipple],
  templateUrl: './shipment-summary-guest.component.html',
  styleUrl: './shipment-summary-guest.component.css'
})
export class ShipmentSummaryGuestComponent {
  /*--------- Inject ---------*/
  http = inject(HttpClient)


  /*------- style settings -------*/
  rippleColor: string = 'rgba(255, 255, 255, 0.2)';

  /*------- Variables -------*/


  trackingNumber: string = '';
  data: any = {};
  errorMessages: string = 'Please enter a valid tracking number';

  loading: boolean = false;

  // No data status
  hasData: boolean = false;

  /*------- Data import -------*/

  // services
  trackingNumberService = inject(TrackingNumberService);
  summaryDataGuestAPI = environment.baseAPI;

  // check data from API
  getSummaryData(trackingNo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.summaryDataGuestAPI}TrackingApi/shipmentSummary`, {
      params: new HttpParams().set('trackingNo', trackingNo)
    });
  }

  /*------- Functions -------*/

  // 驗證是否有登入
  // 驗證trackId是否存在

  /*------- Life Cycle Hooks -------*/

  constructor() {
    effect(() => {
      this.trackingNumber = this.trackingNumberService.getData()();
      if (this.trackingNumber) {
        this.fetchShipmentData();
      }
    });
  }

  ngInit() {

  }



  fetchShipmentData() {
    this.loading = true;
    this.getSummaryData(this.trackingNumber).subscribe({
      next: (res) => {
        // console.log('Tracking Number:', this.trackingNumber);
        this.data = res;
        // 等待API修正
        // if (!this.data || !this.data.ok) {
        //   console.warn('錯誤！', res);
        //   this.hasData = false;
        //   this.errorMessages = 'No shipment data found.';
        //   return;
        // }
        console.log('this.data.Milestone', this.data.Milestone)
        if (this.data.Milestone === undefined) {
          this.hasData = false;
          this.loading = false;
          this.errorMessages = 'No shipment data found.';
          return;
        }
        this.hasData = true;
        this.loading = false;

      },
      error: (err) => {
        console.error('API Error:', err);
        this.hasData = false;
        this.errorMessages = 'No shipment data found.';
        this.loading = false;
      }

    }
    );
  }

  sendTrackingNumber() {
    this.loading = true;
    if (this.trackingNumber.trim() === '') {
      this.hasData = false;
      this.errorMessages = 'Please enter a valid tracking number';
      this.loading = false;
    } else {
      this.trackingNumberService.setData(this.trackingNumber);
      this.fetchShipmentData();
      console.log('Tracking Number:', this.trackingNumber);
      this.loading = false;
    }


  }



}
