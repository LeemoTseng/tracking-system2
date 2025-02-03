import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shipment-details',
  imports: [MatIconModule, MatRippleModule],
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.css'
})
export class ShipmentDetailsComponent {

  /*------- style settings -------*/
  rippleColor: string = 'rgba(0, 0, 0, 0.1)';

  /*------- Variables -------*/
  processList: any = [
    { 
      "icon": "inventory",
      "title": "Booking Creation",
    },
    { 
      "title": "ETD",
      "icon": "package_2" 

    },
    { 
      "title":"ATD",
      "icon": "box" 
    },
    { 
      "title":"ETA",
      "icon": "flight_land" 
    },
    { 
      "title":"ATA",
      "icon": "event_available" 
    },
  ]
  /*

        "icon": "inventory",
        "icon": "package_2",
        "icon": "box",
        "icon": "flight_land",
        "icon": "event_available",


  */
  /*------- Data import -------*/
  /*------- Functions -------*/



}
