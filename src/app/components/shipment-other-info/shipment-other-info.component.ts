import { Component, inject } from '@angular/core';
import { ShipmentOtherInfoDetailsComponent } from '../shipment-other-info-details/shipment-other-info-details.component';
import { ShipmentOtherInfoMilestonesComponent } from '../shipment-other-info-milestones/shipment-other-info-milestones.component';
import { ShipmentOtherInfoFilesComponent } from '../shipment-other-info-files/shipment-other-info-files.component';
import { ShipmentDataService } from '../../services/shipment-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment-other-info',
  imports: [ShipmentOtherInfoDetailsComponent, ShipmentOtherInfoMilestonesComponent, 
    ShipmentOtherInfoFilesComponent,CommonModule
  ],
  templateUrl: './shipment-other-info.component.html',
  styleUrl: './shipment-other-info.component.css'
})
export class ShipmentOtherInfoComponent {

  /*------- style settings -------*/

  /*------- Variables -------*/
  userService = inject(ShipmentDataService);
  
  menu = ['Shipment Details', 'Milestones', 'Files']
  selectedMenu = 'Shipment Details';
  users: any[] = [];

  /*------- Data import -------*/


  /*------- Functions -------*/



  menuSelected(menu: string, $index: number): void {
    this.selectedMenu = menu;
  }



}
