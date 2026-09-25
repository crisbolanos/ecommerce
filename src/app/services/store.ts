import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.modul';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private myShopingCart: IProduct[] = [];
  private myCart = new BehaviorSubject<IProduct[]>([]);

  myCart$ = this.myCart.asObservable();


  addProduct(product: IProduct) {
    this.myShopingCart.push(product);
    this.myCart.next(this.myShopingCart)
  }

  getShopingCart() {
    return this.myShopingCart;
  }

  getTotal() {
    return this.myShopingCart.reduce((sum, product) => sum + product.price, 0);
  }

}
