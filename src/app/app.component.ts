import { Component } from '@angular/core';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PasteryAppAngular';
}
