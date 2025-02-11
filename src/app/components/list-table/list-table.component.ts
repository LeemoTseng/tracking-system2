import { Component, Input, SimpleChanges } from '@angular/core';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-table',
  imports: [MatIconModule, MatTooltipModule, MatRipple],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.css'
})
export class ListTableComponent {


  /*--------- get data from outter ---------*/

  @Input() selectedMenuInner: string = 'All Cargos';



  /*--------- Variables ---------*/

  // table related
  itemsCols: string[] = ['', 'MAWB No.', 'HAWB No.', 'Milestones', '', '', '', ''];
  allStatus: string[] = ['Booked', 'ETD', 'ATD', 'ETA', 'ATA', 'Completed'];



  /*--------- Data import ---------*/

  items: any[] = [
    {
      nowStatus: 'Completed',
    }, {
      nowStatus: 'ATD',
    }
  ]


  /*--------- Functions ---------*/

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedMenuInner']) {
      this.renderItems();
      // 變更後要重新render資料:改變this.items的資料
    }
  }

  // render 
  renderItems() {

  return this.items = [
    {
      nowStatus: 'ATD',
    }, {
      nowStatus: 'ETA',
    }
  ]
  // 根據selectedMenuInner去render對應的items
  /* 處理資料：
    1. nowStatus要處理為六個狀態
    2. 檢查是否要轉換成陣列？
    3. get data functions
   */ 
  }


  // table items
  findNowStatusIndex(allStatus: string[], nowStatus: string): number {
    return allStatus.indexOf(nowStatus);
  }

  test() {
    console.log(this.selectedMenuInner);
  }

}
