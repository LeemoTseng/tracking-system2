import { Component, effect, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentDetailsComponent } from '../../components/summary-page-fully-data/shipment-details/shipment-details.component';
import { ShipmentOtherInfoComponent } from '../../components/summary-page-fully-data/shipment-other-info/shipment-other-info.component';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { environment } from '../../.environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { ViewDetailsTrackingNumberService } from '../../services/view-details-tracking-number.service';
import { TranslateModule } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-shipment-summary',
  imports: [
    HeaderComponent, FooterComponent, RouterOutlet,
    MatIconModule, ShipmentDetailsComponent,
    ShipmentOtherInfoComponent, CommonModule,
    MatRippleModule, RouterLink, TranslateModule
  ],
  templateUrl: './shipment-summary.component.html',
  styleUrl: './shipment-summary.component.css'
})
export class ShipmentSummaryComponent implements OnInit {

  /*--------- Inject ---------*/
  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  i18nService = inject(I18nService);

  trackingNumberService = inject(ViewDetailsTrackingNumberService);

  /*------- Data import -------*/
  baseAPI = environment.baseAPI;

  /*------- Variables -------*/
  currentLang: string = 'en';
  errorKey: string = '';

  trackingNumber: string = '';
  data: any = {};
  errorMessages: string = '';
  loading: boolean = false;
  hasData: boolean = false;

  /*------- Lifecycle Hooks -------*/

  constructor() {
    this.loading = true;
    this.trackingNumber = this.trackingNumberService.getData()();

    effect(() => {
      if (this.trackingNumber) {
        this.getDetailsData(this.trackingNumber)
          .pipe(timeout(15000), catchError(err => {
            console.error('API Timeout or Error:', err);
            this.hasData = false;
            this.loading = false;
            this.setErrorMessage('SHIPMENT_SUMMARY.ERROR_TIMEOUT');
            return throwError(() => err);
          }))
          .subscribe({
            next: (res) => {
              if (!this.data || !res) {
                this.loading = false;
                this.hasData = false;
                this.setErrorMessage('SHIPMENT_SUMMARY.ERROR_NODATA');
                return;
              } else {
                this.hasData = true;
                this.data = res;
                this.loading = false;
              }
            },
            error: (err) => {
              console.log(err);
              this.loading = false;
              this.setErrorMessage('SHIPMENT_SUMMARY.ERROR_MSG');
            }
          });
      } else {
        this.hasData = false;
        this.loading = false;
        this.setErrorMessage('SHIPMENT_SUMMARY.ERROR_NODATA');
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.i18nService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      if (this.errorKey) {
        this.setErrorMessage(this.errorKey);
      }
    });

    this.route.params.subscribe(params => {
      let lang = params['lang'] || 'en';
      this.i18nService.setLanguage(lang);
    });
  }

  /*------- Methods -------*/

  // API call
  getDetailsData(trackingNo: string): Observable<any[]> {
    const token = this.getCookie('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('trackingNo', trackingNo);
    return this.http.get<any[]>(`${this.baseAPI}TrackingApi/ShipmentDetails`, { headers, params });
  }


  setErrorMessage(key: string, params?: any) {
    this.errorKey = key;
    this.i18nService.getTranslationAsync(key, params).subscribe(res => {
      this.errorMessages = res;
    });
  }



  backToLink() {
    this.router.navigate(['/', this.currentLang, 'shipment-list']);
  }

  // get cookie
  getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
