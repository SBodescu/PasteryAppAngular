import { Injectable, inject } from '@angular/core';
import { Product } from './product/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../api/supabaseClient';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.supabaseUrl}/rest/v1/products`;
  products: Product[] = [];
  private httpClient = inject(HttpClient);

  fetchProducts() {
    const supabaseHeaders = new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${environment.supabaseKey}`,
    });
    return this.httpClient
      .get<Product[]>(this.apiUrl, { headers: supabaseHeaders })
      .pipe(
        tap({
          next: (places) => (this.products = places),
        }),
        catchError((error) => {
          console.error('Supabase Error:', error);
          return throwError(() => new Error('Something went wrong'));
        }),
      );
  }
}
