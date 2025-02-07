import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-private-policy',
  imports: [],
  templateUrl: './private-policy.component.html',
  styleUrl: './private-policy.component.css'
})
export class PrivatePolicyComponent {

  /*------- Data  -----*/
  isShowPrivatePolicy:boolean = false;
  
  @Output() sentData = new EventEmitter<boolean>();
  @Input() receivedData: boolean = false;



  /*----------- Send data to Outter -----------*/
  sendPrivatePolicy() {
    this.isShowPrivatePolicy = !this.isShowPrivatePolicy;
    this.sentData.emit(this.isShowPrivatePolicy);
    console.log('sent',this.isShowPrivatePolicy);
  }

}
