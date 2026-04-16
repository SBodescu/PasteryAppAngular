import { Component, Input, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  imports: [CardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input({ required: true }) product!: Product;
  ngOnInit(): void {
    //console.log(this.product);
  }
}
