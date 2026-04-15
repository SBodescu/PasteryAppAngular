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
    const subscription = this.productsService.fetchProducts().subscribe({
      next: (data) => {
        this.productsList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
