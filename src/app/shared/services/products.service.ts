import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@api/supabaseClient';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.supabaseUrl}/rest/v1/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingStateSubject = new BehaviorSubject<boolean>(true);
  private errorStateSubject = new BehaviorSubject<string | null>(null);
  private httpClient = inject(HttpClient);
  products$ = this.productsSubject.asObservable();
  loadingState$ = this.loadingStateSubject.asObservable();
  errorState$ = this.errorStateSubject.asObservable();

  fetchProducts() {
    this.errorStateSubject.next(null);
    this.loadingStateSubject.next(true);
    const url = `${this.apiUrl}?select=*`;
    return this.httpClient.get<Product[]>(url).pipe(
      tap({
        next: (products) => {
          this.productsSubject.next(products);
          this.loadingStateSubject.next(false);
        },
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        this.errorStateSubject.next(error);
        this.loadingStateSubject.next(false);
        return throwError(
          () => new Error('Something went wrong with fetching products'),
        );
      }),
    );
  }

  addProduct(product: Product) {
    return this.httpClient.post(this.apiUrl, product).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = [...currentProducts, product];
        this.productsSubject.next(updatedProducts);
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with adding the product'),
        );
      }),
    );
  }
  editProduct(product: Product) {
    const url = `${this.apiUrl}?id=eq.${product.id}`;
    return this.httpClient.put(url, product).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.map((p) =>
          p.id === product.id ? product : p,
        );
        this.productsSubject.next(updatedProducts);
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with editing the product'),
        );
      }),
    );
  }
  deleteProduct(product: Partial<Product>) {
    const url = `${this.apiUrl}?id=eq.${product.id}`;
    const payload = { ...product, isDeleted: true };
    return this.httpClient.patch(url, payload).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();

        const updatedProducts = currentProducts.map((p) =>
          p.id === product.id ? { ...p, isDeleted: true } : p,
        );
        this.productsSubject.next(updatedProducts);
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with deleting the product'),
        );
      }),
    );
  }

  restoreProduct(product: Partial<Product>) {
    const url = `${this.apiUrl}?id=eq.${product.id}`;
    const payload = { ...product, isDeleted: false };
    return this.httpClient.patch(url, payload).pipe(
      tap(() => {
        const currentProducts = this.productsSubject.getValue();

        const updatedProducts = currentProducts.map((p) =>
          p.id === product.id ? { ...p, isDeleted: false } : p,
        );
        this.productsSubject.next(updatedProducts);
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with restoring the product'),
        );
      }),
    );
  }
}
