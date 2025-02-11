import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-search-bar',
  imports: [MatIconModule, MatMenuModule, MatRipple, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  /* --------- style settings---------*/
  rippleColor: string = 'rgba(255, 255, 255, 0.2)';

  /* --------- variables---------*/

  searchStatus:string = 'All'


  /* --------- functions---------*/
  
  ngOnInit() {
    console.log(this.searchStatus)
  }


  getSearchContent(event: any) {
    
  }


}
