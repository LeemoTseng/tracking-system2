import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ShipmentDataService } from '../../services/shipment-data.service';

@Component({
  selector: 'app-shipment-other-info-details',
  imports: [MatListModule, MatIconModule, MatIconModule],
  templateUrl: './shipment-other-info-details.component.html',
  styleUrl: './shipment-other-info-details.component.css'
})
export class ShipmentOtherInfoDetailsComponent {
  

/*--------- Style settings ---------*/




/*--------- Variables ---------*/

shipmentDataService = inject(ShipmentDataService);
shipmentData: any = [];
shipmentDetails: any = [];




/*--------- Functions ---------*/

ngOnInit() {
  this.shipmentDataService.getShipmentData().subscribe({
    next:(res)=>{
      this.shipmentData = res;
      this.shipmentDetails = this.shipmentData.ShipmentDetails;
    }
  })

}



// Copy text 


copyText(text: string, e: any) {
  if (!text) { return; }

  navigator.clipboard.writeText(text).then(() => {
    console.log(text);
  });

  const copiedElement = e.target.closest('.copyIcon');
  if (!copiedElement || !copiedElement.parentElement) return;

  const copiedMessage = document.createElement('span');
  copiedMessage.textContent = 'Copied!';
  copiedMessage.className = 'absolute inline-block ml-2 px-2 py-1 bg-blackColor/30 bg-opacity-75 text-white rounded text-sm opacity-100 transition-opacity duration-500'

  copiedElement.parentElement.insertBefore(copiedMessage, copiedElement.nextSibling);
  setTimeout(() => {
    copiedMessage.classList.add('opacity-0'); 
    setTimeout(() => copiedMessage.remove(), 400); 
  });
}








}
