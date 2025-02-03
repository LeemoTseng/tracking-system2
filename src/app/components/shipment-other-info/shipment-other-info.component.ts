import { Component } from '@angular/core';
import { ShipmentOtherInfoDetailsComponent } from '../shipment-other-info-details/shipment-other-info-details.component';
import { ShipmentOtherInfoMilestonesComponent } from '../shipment-other-info-milestones/shipment-other-info-milestones.component';
import { ShipmentOtherInfoFilesComponent } from '../shipment-other-info-files/shipment-other-info-files.component';

@Component({
  selector: 'app-shipment-other-info',
  imports: [ShipmentOtherInfoDetailsComponent, ShipmentOtherInfoMilestonesComponent, ShipmentOtherInfoFilesComponent],
  templateUrl: './shipment-other-info.component.html',
  styleUrl: './shipment-other-info.component.css'
})
export class ShipmentOtherInfoComponent {

  /*------- style settings -------*/
  
  /*------- Variables -------*/
  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';
  
  /*------- Data import -------*/

  /*------- Functions -------*/
  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
  }



}
