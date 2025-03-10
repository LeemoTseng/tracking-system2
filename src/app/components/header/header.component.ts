import { Component, HostListener, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogoutPopupComponent } from "../logout-popup/logout-popup.component";
import { MatRippleModule } from '@angular/material/core';
import { LoginComponent } from '../../pages/login/login.component';
import { LoginPopupComponent } from "../login-popup/login-popup.component";

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, MatTooltipModule,
    LogoutPopupComponent, LogoutPopupComponent, MatRippleModule,
    LoginPopupComponent, LoginPopupComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  /*--------- Inject ---------*/

  router = inject(Router);
  cookieService = inject(CookieService)

  /*--------- variables ---------*/

  account: string = '';
  userToken: string = '';
  toggleLogout: boolean = false;
  toggleLogin: boolean = false;

  /*--------- style settings ---------*/

  menuDisabled: boolean = false;
  rippleColor: string = 'rgba(0, 0, 0, 0.02)';

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
    if (this.userToken == '') {
      this.userToken = this.cookieService.get('authToken');
      this.account = this.cookieService.get('account');
    } else {
      this.userToken = '';
    }
    this.getUrlAndRender();
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
    if (this.selectedMenu === menu) {
      window.location.reload();
    } else {
      this.navigateTo(route);
      this.selectedMenu = menu;
    }
  }



  // router
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  getUrlAndRender() {
    this.url = this.router.url;
    if (this.url == "/shipment-summary-guest") {
      this.selectedMenu = "Shipment Summary"
      if (this.userToken == "") {
        this.toggleLogin = false;
      }
    } else if (this.url == "/shipment-list") {
      this.selectedMenu = "Shipment List"
      if (this.userToken !== "") {
        this.toggleLogin = false;

      } else {
        this.toggleLogin = true;
        // this.router.navigate(['/login']);
      }
    } else if (this.url == "/shipment-summary") {
      this.selectedMenu = "Shipment List"
      if (this.userToken !== "") {
        this.toggleLogin = false;
      } else {
        this.toggleLogin = true;

        // this.router.navigate(['/login']);

      }
    } else {
      this.selectedMenu = "Shipment List"
    }
  }

  logoutBtn() {
    this.toggleLogout = true;
  }
  toggleLogoutChange(event: boolean) {
    this.toggleLogout = event;
  }

  loginBtn() {
    this.toggleLogin = true;
  }
  toggleLoginChange(event: boolean) {
    this.toggleLogin = event;
  }








}
