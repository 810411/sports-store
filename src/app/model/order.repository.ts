import {Injectable} from '@angular/core';
import {StaticDataSource} from './static.datasource';
import {Observable} from 'rxjs';
import {Order} from './order';
import {RestDataSource} from './rest.datasource';

@Injectable()
export class OrderRepository {

  private orders: Order[] = [];
  private loaded = false;

  constructor(
    private dataSource: RestDataSource
  ) { }

  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order)
      .subscribe(o => {
        this.orders.splice(
          this.orders.findIndex(item => item.id === o.id),
          1,
          o
        );
      });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id)
      .subscribe(_ => {
        this.orders.splice(this.orders.findIndex(o => id === o.id), 1);
      });
  }
}
