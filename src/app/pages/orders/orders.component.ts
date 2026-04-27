import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OrderComponent } from './components/order/order.component';
import { Order } from '@shared/models/order.model';
import { OrdersService } from '@shared/services/orders.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [OrderComponent, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  ordersList: Order[] = [];

  displayedItems: Order[] = [];
  itemsPerPage: number = 3;
  page: number = 0;
  totalPages: number = 0;

  private ordersService = inject(OrdersService);
  private destroyRef = inject(DestroyRef);

  isLoading$ = this.ordersService.loadingState$;
  errorMessage$ = this.ordersService.errorState$;

  ngOnInit(): void {
    const fetchSubscription = this.ordersService.fetchOrders().subscribe();
    const ordersSubscription = this.ordersService.orders$.subscribe({
      next: (orders) => {
        this.ordersList = orders;
        this.totalPages =
          Math.ceil(this.ordersList.length / this.itemsPerPage) || 1;
        this.updatePagination();
      },
    });
    this.destroyRef.onDestroy(() => {
      fetchSubscription.unsubscribe();
      ordersSubscription.unsubscribe();
    });
  }

  updatePagination() {
    const startIndex = this.page * this.itemsPerPage;
    this.displayedItems = this.ordersList.slice(
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
