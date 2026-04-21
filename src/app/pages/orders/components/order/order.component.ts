import { Component, inject, Input } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input({ required: true })
  ordersList!: Order[];
  private ordersService = inject(OrdersService);

  onChangeStatus(status: string, order: Order) {
    this.ordersService.changeOrderStatus(order, status).subscribe();
    const updatedOrders = this.ordersList.map((o) =>
      o.id === order.id ? { ...o, status: status } : o,
    );
    this.ordersList = updatedOrders;
  }
}
