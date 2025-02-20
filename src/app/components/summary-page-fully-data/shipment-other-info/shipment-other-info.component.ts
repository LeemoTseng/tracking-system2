import { Component, inject, Input } from '@angular/core';
import { ShipmentOtherInfoDetailsComponent } from '../../summary-page-fully-data/shipment-other-info-details/shipment-other-info-details.component';
import { ShipmentOtherInfoMilestonesComponent } from '../../summary-page-fully-data/shipment-other-info-milestones/shipment-other-info-milestones.component';
import { ShipmentOtherInfoFilesComponent } from '../../summary-page-fully-data/shipment-other-info-files/shipment-other-info-files.component';
import { ShipmentDataService } from '../../../services/shipment-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../.environments/environment.prod';
import { ViewDetailsTrackingNumberService } from '../../../services/view-details-tracking-number.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-shipment-other-info',
  imports: [ShipmentOtherInfoDetailsComponent, ShipmentOtherInfoMilestonesComponent,ShipmentOtherInfoFilesComponent,CommonModule],
  templateUrl: './shipment-other-info.component.html',
  styleUrl: './shipment-other-info.component.css'
})
export class ShipmentOtherInfoComponent {

  /*--------- @Input ---------*/
  
  @Input() trackingNumber: string = '';

  /*--------- Inject ---------*/
  userService = inject(ShipmentDataService);
  router = inject(Router);
  http = inject(HttpClient);

  /*------- style settings -------*/

  /*------- Variables -------*/

  data: any = {};
  
  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';
  users: any[] = [];

  isLoading:boolean = false;


  /*------- Functions -------*/

  // ngOnInit() {
  //   console.log('app-shipment-other-info','trackingNumber',this.trackingNumber)
  // }


  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
  }




}
