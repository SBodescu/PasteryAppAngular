import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OrderComponent } from './components/order/order.component';
import { Order } from './models/order.model';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [OrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  ordersList: Order[] = [];
  private ordersService = inject(OrdersService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const fetchSubscription = this.ordersService.fetchOrders().subscribe();
    const ordersSubscription = this.ordersService.orders$.subscribe({
      next: (orders) => (this.ordersList = orders),
    });
    this.destroyRef.onDestroy(() => {
      fetchSubscription.unsubscribe();
      ordersSubscription.unsubscribe();
    });
  }
}
