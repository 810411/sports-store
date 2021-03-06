import {NgModule} from '@angular/core';
import {ProductRepository} from './product. repository';
import {StaticDataSource} from './static.datasource';
import {Cart} from './cart.model';
import {Order} from './order';
import {OrderRepository} from './order.repository';
import {RestDataSource} from './rest.datasource';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../admin/auth/auth.service';

@NgModule({
  providers: [
    ProductRepository,
    Cart,
    Order,
    OrderRepository,
    { provide: StaticDataSource, useClass: RestDataSource },
    RestDataSource,
    AuthService
  ],
  imports: [
    HttpClientModule
  ]
})
export class ModelModule { }
