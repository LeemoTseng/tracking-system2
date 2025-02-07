import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { PrivatePolicyComponent } from '../private-policy/private-policy.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [PrivatePolicyComponent, ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  /*------- Data -----*/
  isShowPrivatePolicy: boolean = false;


  /*----------- Send data to Inner -----------*/

  togglePrivatePolicy() {
    this.isShowPrivatePolicy = !this.isShowPrivatePolicy;
  }

  /*----------- Get data from inner -----------*/
  receivePrivatePolicy(e: boolean) {
    this.isShowPrivatePolicy = e;
  }
  sendPrivatePolicy() {
    this.isShowPrivatePolicy = !this.isShowPrivatePolicy;
    console.log('sent', this.isShowPrivatePolicy);
  }

}
