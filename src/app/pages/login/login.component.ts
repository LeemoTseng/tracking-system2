import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import {MatIconModule} from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, MatIconModule, MatRippleModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /* styles settings */
  rippleColor = 'rgba(255, 255, 255, 0.1)';

  /* Variables */



}
