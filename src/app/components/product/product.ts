import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product.modul';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {

  @Input() product: IProduct = {
    id: "",
    name: "",
    image: "",
    price: 0
  };

}
