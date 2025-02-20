import { Component, effect, inject, Input, SimpleChanges } from '@angular/core';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TrackingNumberService } from '../../services/tracking-number.service';
import { FormsModule } from '@angular/forms';
import { ViewDetailsTrackingNumberService } from '../../services/view-details-tracking-number.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-table',
  imports: [MatIconModule, MatTooltipModule, MatRipple, FormsModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent {


  /*--------- Inject ---------*/
  trackingNumberService = inject(ViewDetailsTrackingNumberService);
  router = inject(Router);

  /*--------- get data from outter ---------*/
  @Input() selectedMenuInner: string = 'All Cargos';

  /*--------- Variables ---------*/

  // table related
  itemsCols: string[] = ['', 'MAWB No.', 'HAWB No.', 'Milestones', '', '', '', ''];
  allStatus: string[] = ['Booked', 'ETD', 'ATD', 'ETA', 'ATA', 'Completed'];

  // trackingNumber
  trackingNumber: string = '';



  /*--------- Data import ---------*/

  items: any[] = [
    { nowStatus: 'Completed' }, { nowStatus: 'ATD' }
  ]


  /*--------- Functions ---------*/

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedMenuInner']) {
      this.renderItems();
    }
  }

  // render 
  renderItems() {

    return this.items = [
      {
        nowStatus: 'ATD',
        HAWBno: 'THI132400003',
        MAWBno: 'MAWB123',
      }, {
        nowStatus: 'ETA',
        HAWBno: 'THI012402943',
        MAWBno: 'MAWB456',
      }
      , {
        nowStatus: 'ETA',
        HAWBno: 'TECSHA126236',
        MAWBno: 'MAWB456',
      }
    ]
    // 根據selectedMenuInner去render對應的items
      /* 處理資料：
        1. nowStatus要處理為六個狀態
        2. 檢查是否要轉換成陣列？
        3. get data functions
      */
  }

  // view items
  //Click and view the details of the item

  viewItemBtn(trackingNumber:string){
    this.trackingNumberService.setData(trackingNumber);
    console.log('this.trackingNumber',trackingNumber);
    this.router.navigate(['/shipment-summary']);
  }


  // table items
  findNowStatusIndex(allStatus: string[], nowStatus: string): number {
    return allStatus.indexOf(nowStatus);
  }

  test() {
    console.log(this.selectedMenuInner);
  }

}
