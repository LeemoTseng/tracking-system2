import { Component } from '@angular/core';
import { ShipmentOtherInfoDetailsGuestComponent } from '../shipment-other-info-details-guest/shipment-other-info-details-guest.component';
import { ShipmentOtherInfoFilesGuestComponent } from '../shipment-other-info-files-guest/shipment-other-info-files-guest.component';
import { ShipmentOtherInfoMilestonesComponent } from '../../summary-page-fully-data/shipment-other-info-milestones/shipment-other-info-milestones.component';
import { ShipmentOtherInfoMilestonesGuestComponent } from '../shipment-other-info-milestones-guest/shipment-other-info-milestones-guest.component';

@Component({
  selector: 'app-shipment-other-info-guest',
  imports: [ShipmentOtherInfoDetailsGuestComponent,
    ShipmentOtherInfoFilesGuestComponent, 
    ShipmentOtherInfoMilestonesGuestComponent
  ],
  templateUrl: './shipment-other-info-guest.component.html',
  styleUrl: './shipment-other-info-guest.component.css'
})
export class ShipmentOtherInfoGuestComponent {

  /*------- style settings -------*/

  /*------- Variables -------*/

  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';
  users: any[] = [];

  isLoading: boolean = false;

  /*------- Data import -------*/


  /*------- Functions -------*/

  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
  }

}
