import { Component, HostListener, inject, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogoutPopupComponent } from "../logout-popup/logout-popup.component";
import { MatRippleModule } from '@angular/material/core';
import { LoginComponent } from '../../pages/login/login.component';
import { LoginPopupComponent } from "../login-popup/login-popup.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, MatTooltipModule,
    LogoutPopupComponent, LogoutPopupComponent, MatRippleModule,
    LoginPopupComponent, LoginPopupComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  /*--------- Inject ---------*/

  router = inject(Router);
  route = inject(ActivatedRoute)
  cookieService = inject(CookieService)
  translate = inject(TranslateService);
  i18nService = inject(I18nService);

  /*--------- variables ---------*/

  currentLang: string = 'en';
  account: string = '';
  userToken: string = '';
  toggleLogout: boolean = false;
  toggleLogin: boolean = false;

  /*--------- style settings ---------*/

  menuDisabled: boolean = false;
  rippleColor: string = 'rgba(0, 0, 0, 0.02)';

  /*--------- items ---------*/
  menuList: any[] = [
    { key: 'SHIPMENT_SUMMARY', route: 'shipment-summary-guest' },
    { key: 'SHIPMENT_LIST', route: 'shipment-list' }
  ];

  _selectedMenu: string = "";
  url: string = "";

  /*--------- functions ---------*/

  // on init

  ngOnInit() {

  // LANGUAGE - Getter and Setter
    // current lan
    this.i18nService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    // get and set lan
    this.route.params.subscribe(params => {
      let lang = params['lang'] || 'en';
      this.i18nService.setLanguage(lang);
    });

    // get user token and account
    if (this.userToken == '') {
      this.userToken = this.cookieService.get('authToken');
      this.account = this.cookieService.get('account');
    } else {
      this.userToken = '';
    }
    this.getUrlAndRender();
  }

  // MENU - Getter and Setter
  get selectedMenu() {
    return this._selectedMenu;
  }

  set selectedMenu(value: string) {
    this._selectedMenu = value;
  }


  // select menu

  // router
  navigateTo(key: string, route: string) {
    if (this.selectedMenu === key) {
      window.location.reload();
    } else {
      this.router.navigate(['/', this.currentLang, route]);
      this.selectedMenu = key;
    }
  }

  changeLanguage(lang: string) {
    this.i18nService.setLanguage(lang);
    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${lang}`, currentUrl]);
  }

  getUrlAndRender() {
    this.url = this.router.url.split('/').slice(2).join('/');

    const foundMenu = this.menuList.find(item => item.route === this.url);
    this.selectedMenu = foundMenu ? foundMenu.key : '';
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

  // language settings
  lanBtn(lang: string) {
    this.currentLang = lang;
    this.translate.use(this.currentLang);

    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate([`/${this.currentLang}`, currentUrl]);
  }






}




