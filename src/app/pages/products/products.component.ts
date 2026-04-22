import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { Product } from './models/product.model';
import { ProductsService } from './services/products.service';
import { FiltersComponent } from './components/filters/filters.component';
import { FiltersService } from './services/filters.service';
import { Filter } from './models/filter.model';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, FiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productsList: Product[] = [];

  filteredItems: Product[] = [];
  filters: Filter = {
    search: '',
    category: 'all',
    price: '',
    alphabetical: 'none',
  };

  displayedItems: Product[] = [];
  itemsPerPage: number = 6;
  page: number = 0;
  totalPages: number = 0;

  isLoading: boolean = true;
  errorMessage: string | null = null;

  private filtersService = inject(FiltersService);
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
        this.applyFiltersAndPagination();
      },
    });

    this.destroyRef.onDestroy(() => {
      fetchSubscription.unsubscribe();
      prodSubscription.unsubscribe();
    });
  }

  onFiltersUpdated(newFilters: Filter) {
    this.filters = newFilters;
    this.page = 0;
    this.applyFiltersAndPagination();
  }

  applyFiltersAndPagination() {
    this.filteredItems = this.filtersService.filterAndSortProducts(
      this.productsList,
      this.filters,
    );
    this.totalPages =
      Math.ceil(this.filteredItems.length / this.itemsPerPage) || 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = this.page * this.itemsPerPage;
    this.displayedItems = this.filteredItems.slice(
      startIndex,
      startIndex + this.itemsPerPage,
    );
  }

  pageDown() {
    if (this.page > 0) {
      this.page -= 1;
      this.updatePagination();
    }
  }

  pageUp() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.updatePagination();
    }
  }
}
