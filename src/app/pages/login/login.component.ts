import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { TrackingNumberService } from '../../services/tracking-number.service';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, MatIconModule, MatRippleModule,
    CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /*------- Inject -------*/
  router = inject(Router)
  authService = inject(LoginService);
  cookieService = inject(CookieService);

  /*------- styles settings -------*/
  rippleColor = 'rgba(255, 255, 255, 0.1)';


  /*------- Variables -------*/
  //loading
  loading:boolean = false;

  // tracking number
  trackingNumber: string = '';
  isValidTrackingNum: boolean = false;
  alertMessage: string = '';

  // login
  account = '';
  password = '';
  isLoginInput = false;
  loginAlertMessage = '';
  rememberMe = false;
  typing = true;

  isLogin: boolean = false;


  linkToList = '/shipment-list';


  /*------- Data import -------*/
  
  // services
  trackingNumberService = inject(TrackingNumberService);



  /*------- Functions -------*/

  ngOnInit() {
    // check if user is already logged in
    const rememberMeCookie = this.cookieService.get('rememberMe');
    const authToken = this.cookieService.get('authToken');
    if (rememberMeCookie === 'true') {
      this.rememberMe = rememberMeCookie === 'true';
      this.account = this.cookieService.get('account');
    }else{
      this.rememberMe = false;
      this.account = '';
    }

    if(authToken){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
    
  }

  checkLogin() {
    this.loading = true;
    this.checkLoginInput(this.account, this.password);
    if (!this.isLoginInput){
      this.loading = false;
      return;
    } 
    this.authService.login(this.account, this.password, this.rememberMe).subscribe({
      next: (res) => {
        const token = res.data;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); 

        this.cookieService.set('authToken', res.data, {
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
        this.cookieService.set('account', this.account.toString(), {
          expires: expirationDate,
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
        this.cookieService.set('rememberMe', this.rememberMe.toString(), {
          expires: expirationDate,
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
        this.router.navigate(['/shipment-list']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loginAlertMessage = 'Login failed, please try again';
        this.isLoginInput = false;
        this.typing = false;
        this.loading = false;

      }
    });
  }

  checkLoginInput(account: string, password: string) {
    if (account.trim() == '' || password.trim() == '') {
      this.isLoginInput = false;
      this.typing = false;
      this.loginAlertMessage = 'Please enter your account and password';
    } else {
      this.isLoginInput = true;
      this.typing = true;
    }
  }

  typeAccount(e: any) {
    this.typing = true;
    this.loginAlertMessage = '';
  }

  checkValid(e: any) {
    console.log(e.target.value);
    if (e.target.value === '') {
      this.isValidTrackingNum = false;
      
      this.alertMessage = 'the tracking number cannot be empty';
    } else {
      this.isValidTrackingNum = true;
      this.alertMessage = '';
    }
  }

  sendTrackingNumber() {
    if (this.isValidTrackingNum) {
      console.log('sent!');
      this.trackingNumberService.setData(this.trackingNumber);
      this.router.navigate(['/shipment-summary-guest']);
    } else {
      this.alertMessage = 'Please enter a valid tracking number';
    }
  }

  logout() {
    this.authService.logout(); 
  }



}
