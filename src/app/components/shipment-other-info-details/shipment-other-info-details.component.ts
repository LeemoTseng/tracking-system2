import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ShipmentDataService } from '../../services/shipment-data.service';

@Component({
  selector: 'app-shipment-other-info-details',
  imports: [MatListModule, MatIconModule],
  templateUrl: './shipment-other-info-details.component.html',
  styleUrl: './shipment-other-info-details.component.css'
})
export class ShipmentOtherInfoDetailsComponent {
  

/*--------- Style settings ---------*/

/*--------- Variables ---------*/

[key: string]: any;
users: any[] = [];

userService = inject(ShipmentDataService);

General_Info:any[] =[]
Package_Info:any[] =[]
Route_Info:any[] =[]
Shipper_Info:any[] =[]
Consignee_Info:any[] =[]

/*--------- Functions ---------*/













/* Copy text */

 copyText(section: string, index: number) {
    const sectionData = this[section];
    const item = sectionData[index];

    // 複製到剪貼簿
    navigator.clipboard.writeText(item.value).then(() => {
      console.log(item.value);

      // 更新當前項目的 isCopied 為 true
      this[section] = sectionData.map((entry: any, i: number) => ({
        ...entry,
        isCopied: i === index,
      }));
        console.log('isCopied', this[section][index].isCopied)

      // 2 秒後重置 isCopied 為 false
      setTimeout(() => {
        this[section][index].isCopied = false;
      }, 600);
    });
  }



}
