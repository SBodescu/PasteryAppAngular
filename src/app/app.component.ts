import { Component } from '@angular/core';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, ProductsComponent, LoginComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PasteryAppAngular';
}
