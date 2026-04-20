import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productsList: Product[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  private productsService = inject(ProductsService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const fetchSubscription = this.productsService.fetchProducts().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
    const prodSubscription = this.productsService.products$.subscribe({
      next: (data) => {
        this.productsList = data.filter((p) => p.isDeleted !== true);
      },
    });
    this.destroyRef.onDestroy(() => {
      fetchSubscription.unsubscribe();
      prodSubscription.unsubscribe();
    });
  }
}
