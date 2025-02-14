import { Component, effect, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentDetailsComponent } from '../../components/summary-page-fully-data/shipment-details/shipment-details.component';
import { ShipmentOtherInfoComponent } from '../../components/summary-page-fully-data/shipment-other-info/shipment-other-info.component';
import { CommonModule } from '@angular/common';
import { TrackingNumberService } from '../../services/tracking-number.service';

@Component({
  selector: 'app-shipment-summary',
  imports: [HeaderComponent, FooterComponent, RouterOutlet,
    MatIconModule, ShipmentDetailsComponent,
    ShipmentOtherInfoComponent, CommonModule],
  templateUrl: './shipment-summary.component.html',
  styleUrl: './shipment-summary.component.css'
})
export class ShipmentSummaryComponent {

  /*------- style settings -------*/

  /*------- Variables -------*/

  /*------- Data import -------*/



  /*------- Functions -------*/

  // 驗證是否有登入
  // 驗證trackId是否存在


  /*------- Life Cycle Hooks -------*/







}
