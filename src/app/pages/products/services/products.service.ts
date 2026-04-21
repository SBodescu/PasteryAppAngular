import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../api/supabaseClient';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.supabaseUrl}/rest/v1/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private httpClient = inject(HttpClient);
  products$ = this.productsSubject.asObservable();

  fetchProducts() {
    const url = `${this.apiUrl}?select=*`;
    return this.httpClient.get<Product[]>(url).pipe(
      tap({
        next: (products) => this.productsSubject.next(products),
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with fetching products'),
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
