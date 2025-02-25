import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListTableComponent } from '../../components/list-table/list-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-shipment-list',
  imports: [SearchBarComponent, HeaderComponent, ListTableComponent, FooterComponent],
  templateUrl: './shipment-list.component.html',
  styleUrl: './shipment-list.component.css'
})
export class ShipmentListComponent {

  /*--------- Inject ---------*/
  cookieService = inject(CookieService);

  /*--------- Variables ---------*/

  account: string = 'User'
  // menu items
  menuItems = ['All Cargos', 'On-Going', 'Completed'];
  selectedMenu: string = 'All Cargos';

  searchListData = {}
  totalPages:number = 0;


  /*--------- Data import ---------*/

  getSearchListData(item:any){
    // console.log('shipment-list-list-data', item)
    this.searchListData = item
  }

  getTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }



  /*--------- Functions ---------*/

  ngOnInit() {
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      this.account = this.cookieService.get('account');
    } 
  }


  // select menu
  menuSelected(menu: string) {
    this.selectedMenu = menu;
  }




  /*--------- Getters and Setters ---------*/
  // select menu






}
