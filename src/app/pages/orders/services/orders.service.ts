import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../api/supabaseClient';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.supabaseUrl}/rest/v1/orders`;
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private httpClient = inject(HttpClient);
  orders$ = this.ordersSubject.asObservable();

  fetchOrders() {
    const url = `${this.apiUrl}?select=*`;
    return this.httpClient.get<Order[]>(url).pipe(
      tap({
        next: (orders) => this.ordersSubject.next(orders),
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with fetching products'),
        );
      }),
    );
  }

  addOrder(order: Order) {
    return this.httpClient.post(this.apiUrl, order).pipe(
      tap((order) => console.log(order)),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with deleting the product'),
        );
      }),
    );
  }

  changeOrderStatus(order: Order, newStatus: string) {
    const url = `${this.apiUrl}?id=eq.${order.id}`;
    const payload = { status: newStatus };

    return this.httpClient.patch<Order>(url, payload).pipe(
      tap(() => {
        const currentOrders = this.ordersSubject.getValue();

        const updatedOrders = currentOrders.map((o) => {
          return o.id === order.id ? { ...o, status: newStatus } : o;
        });

        this.ordersSubject.next(updatedOrders);
      }),
      catchError((error) => {
        console.error('Supabase Error:', error);
        return throwError(
          () => new Error('Something went wrong with editing the order status'),
        );
      }),
    );
  }
}
