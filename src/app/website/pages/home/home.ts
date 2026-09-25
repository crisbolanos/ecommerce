import { Component, inject, signal } from '@angular/core';
import { Products } from '../../../shared/components/products/products';
import { ProductsS } from '../../../services/products';
import { IProduct } from '../../../models/product.modul';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [Products],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  private productsService = inject(ProductsS);
  private route = inject(ActivatedRoute);

  products = signal<IProduct[]>([]);
  limit = 10;
  offset = 0;
  productId: string | null = null;

  ngOnInit() {
    this.productsService.getAllProcudcts(this.limit, this.offset).subscribe((data) => {
      this.products.set(data);
      this.offset += this.limit;
    })
    this.route.queryParamMap
      .subscribe(params => {
        this.productId = params.get('product');
        console.log(this.productId);
      })
  }

  onLoadMore() {
    this.productsService.getProdutsBypage(this.limit, this.offset).subscribe((data) => {
      this.products.update((value) => [...value, ...data]);
      this.offset += this.limit;
    })
  }

}
