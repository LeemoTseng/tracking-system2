import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  /* style settings */


  /* items */
    menuList: any[] = [
    { name: 'Shipment Summary', routerLink: '/shipment-summary' },
    { name: 'Shipment List', routerLink: '/shipment-list/all-shipment' },
  ];
    selectedMenu: string = "";

  /* functions */

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }



}
