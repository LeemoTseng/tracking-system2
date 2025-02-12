import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ShipmentDetailsComponent } from '../../components/shipment-details/shipment-details.component';
import { ShipmentOtherInfoComponent } from '../../components/shipment-other-info/shipment-other-info.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';

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
