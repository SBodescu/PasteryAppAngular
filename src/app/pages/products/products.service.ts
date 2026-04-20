import { Injectable, inject } from '@angular/core';
import { Product } from './product/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../api/supabaseClient';
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
    const url = `${this.apiUrl}?select=*&isDeleted=is.false`;
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

        const updatedProducts = currentProducts.filter(
          (p) => p.id !== product.id,
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
}
