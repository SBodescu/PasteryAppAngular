import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../products/services/products.service';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../products/models/product.model';
import { RecentlyDeletedModalComponent } from './components/recently-deleted-modal/recently-deleted-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [ProductsComponent, RecentlyDeletedModalComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  private productsService = inject(ProductsService);
  deletedProducts: Product[] = [];
  showDeletedItemsModal: boolean = false;

  ngOnInit(): void {
    const subscription = this.productsService.products$.subscribe({
      next: (products) => {
        this.deletedProducts = products.filter(
          (product) => product.isDeleted === true,
        );
      },
    });
  }

  onOpenClick(): void {
    this.showDeletedItemsModal = true;
  }

  onRestoreProduct(product: Product) {
    this.productsService.restoreProduct(product);
  }
}
