import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../../models/product.modul';
import { Img } from '../img/img'
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [Img, CurrencyPipe, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {


  @Input() product: IProduct = {
    id: 0,
    title: "",
    price: 0,
    images: [],
    description: "",
    category: {
      id: 0,
      name: "",
      typeImg: ""
    }
  };

  @Output() addedproduct = new EventEmitter<IProduct>();
  @Output() showProduct = new EventEmitter<number>();

  onAddToCart() {
    this.addedproduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

}
