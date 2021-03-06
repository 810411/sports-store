import { Component } from '@angular/core';
import {Product} from '../../model/product.model';
import {ProductRepository} from '../../model/product. repository';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styles: [
  ]
})
export class ProductEditorComponent {

  editing = false;
  product: Product = new Product();

  constructor(
    private repository: ProductRepository,
    private router: Router,
    public activeRoute: ActivatedRoute
  ) {
    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing) {
      Object.assign(
        this.product,
        repository.getProduct(parseInt(activeRoute.snapshot.params.id, 10))
      );
    }
  }

  save(form: NgForm) {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }

}
