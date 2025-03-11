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
    // language settings
    const availableLangs = ['en', 'tw', 'cn'];
    this.translate.addLangs(availableLangs);
    this.translate.setDefaultLang('en');

    // update language
    this.route.params.subscribe(params => {
      let lang = params['lang'] || 'en';

      if (lang === 'tw') lang = 'tw';
      if (lang === 'cn') lang = 'cn';

      if (!availableLangs.includes(lang)) {
        lang = 'en';
        this.router.navigate(['/en']);
      }
      this.currentLang = params['lang'];
      this.translate.use(lang);

      this.getUrlAndRender();
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

  getUrlAndRender() {
    this.url = this.router.url.split('/').slice(2).join('/'); // 去除語言部分

    const foundMenu = this.menuList.find(item => item.route === this.url);
    this.selectedMenu = foundMenu ? foundMenu.key : ''; // 只更新有效選單
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




