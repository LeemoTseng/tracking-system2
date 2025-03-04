import { Component, HostListener, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ListTableComponent } from '../../components/list-table/list-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-shipment-list',
  imports: [SearchBarComponent, HeaderComponent, ListTableComponent, FooterComponent, MatIconModule],
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
  totalPages: number = 0;

  // Scroll to top
  isShowArrow: boolean = false;
  scrollY = 0;


  /*--------- Data import ---------*/

  getSearchListData(item: any) {
    this.searchListData = item
    this.searchListData = JSON.parse(JSON.stringify(this.searchListData)); // deep copy
    console.log('shipment-list/getSearchListData(item: any)', this.searchListData)
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


  // Scroll to top
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.scrollY = window.scrollY;
    if (this.scrollY > 200) {
      this.isShowArrow = true;

    }
    if (this.scrollY < 200) {
      this.isShowArrow = false;
    }
  }






}
