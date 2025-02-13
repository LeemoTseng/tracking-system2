import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  /*--------- Inject ---------*/

  constructor(@Inject(Router) private router: Router) { }



  /*--------- style settings ---------*/


  /*--------- items ---------*/
  menuList: any[] = [
    { name: 'Shipment Summary', routerLink: '/shipment-summary-guest' },
    { name: 'Shipment List', routerLink: '/shipment-list' },
  ];
  _selectedMenu: string = "";
  url: string = "";

  /*--------- functions ---------*/

  // on init

  ngOnInit() {
    this.getUrlAndRender()

  }

  // Getter and Setter

  get selectedMenu() {
    return this._selectedMenu;
  }

  set selectedMenu(value: string) {
    this._selectedMenu = value;
  }


  // select menu
  selectMenu(menu: string, route: string) {
    this.navigateTo(route)
    this.selectedMenu = menu;
  }

  // router
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getUrlAndRender() {
    this.url = this.router.url;
        if (this.url == "/shipment-summary-guest") {
      this.selectedMenu = "Shipment Summary"
    } else {
      this.selectedMenu = "Shipment List"
    }
  }





}
