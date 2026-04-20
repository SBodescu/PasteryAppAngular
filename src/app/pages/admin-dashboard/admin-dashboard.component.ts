import { Component, inject } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ProductsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {}
