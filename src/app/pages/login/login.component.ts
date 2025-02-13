import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, MatIconModule, MatRippleModule,
    CommonModule, FormsModule],
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

  trackingNumber: string = '';
  isValidTrackingNum: boolean = false;
  alertMessage: string = '';

  // login
  account = '';
  password = '';
  isLogin = false;
  loginAlertMessage = '';
  rememberMe = false;
  typing = true;

  /*------- Data import -------*/



  /*------- Functions -------*/

  checkLogin() {
    this.checkLoginInput(this.account, this.password);
    if(!this.isLogin) return;
    this.authService.login(this.account, this.password, this.rememberMe).subscribe({
      next: (res) => {
        const token = res.data;
        this.cookieService.set('authToken', res.data, {
          path: '/',
          secure: true,
          sameSite: 'Strict'
        });
        this.router.navigate(['/shipment-list']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.loginAlertMessage = 'Login failed, please try again';
        this.isLogin = false;
        this.typing = false;

      }
    });
  }

  checkLoginInput(account: string, password: string) {
    if (account.trim() == '' || password.trim() == '') {
      this.isLogin = false;
      this.typing = false;
      this.loginAlertMessage = 'Please enter your account and password';
    } else {
      this.isLogin = true;
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
    } else if (this.trackingNumber !== Number(this.trackingNumber).toString()) {
      this.isValidTrackingNum = false;
      this.alertMessage = 'Tracking number must be a number';
    } else {
      this.isValidTrackingNum = true;
      this.alertMessage = '';
    }
  }

  sendTrackingNumber() {
    if (this.isValidTrackingNum) {
      console.log('sent!');
    } else {
      this.alertMessage = 'Please enter a valid tracking number';
    }
  }



}
