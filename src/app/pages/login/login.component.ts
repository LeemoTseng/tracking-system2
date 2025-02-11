import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, MatIconModule, MatRippleModule, 
     CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /*------- Variables -------*/
  



  

  /*------- styles settings -------*/
  rippleColor = 'rgba(255, 255, 255, 0.1)';


  /*------- Variables -------*/

  trackingNumber: string = '';
  isValidTrackingNum: boolean = false;
  alertMessage: string = '';
  isLoginError: boolean = false;

  // login
  account='';
  password='';


  /*------- Functions -------*/

  checkLogin() {
    if (true) {
      this.isLoginError = false;
      console.log('login success');
      window.location.href = '/shipment-list';
      
    } else {
      this.isLoginError = true;
      console.log('login failed');
    }
  }

  checkLoginInput(e:any){
    console.log(e.target.value);
    if (e.target.value === '') {
      this.isLoginError = true;
    } else {
      this.isLoginError = false;
    }
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
