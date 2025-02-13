import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ShipmentDetailsGuestComponent } from '../../components/summary-page-guest/shipment-details-guest/shipment-details-guest.component';
import { ShipmentOtherInfoGuestComponent } from '../../components/summary-page-guest/shipment-other-info-guest/shipment-other-info-guest.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-shipment-summary-guest',
  imports: [RouterOutlet, FooterComponent, ShipmentDetailsGuestComponent, 
    ShipmentOtherInfoGuestComponent, MatIconModule, HeaderComponent],
  templateUrl: './shipment-summary-guest.component.html',
  styleUrl: './shipment-summary-guest.component.css'
})
export class ShipmentSummaryGuestComponent {

}
