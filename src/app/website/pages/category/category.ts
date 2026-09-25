import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsS } from '../../../services/products';
import { IProduct } from '../../../models/product.modul';
import { Products } from '../../../shared/components/products/products';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-category',
  imports: [Products],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products = signal<IProduct[]>([]);
  productId: string | null = null;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductsS);


  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          if (params.get('id')) {
            this.offset = 0;
          }
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [];
        })
      )
      .subscribe(data => {
        this.products.set(data);
        this.offset += this.limit;
      });

    this.route.queryParamMap
      .subscribe(params => {
        this.productId = params.get('product');
        console.log(this.productId);
      })
  }


  onLoadMore() {
    this.productService.getByCategory(this.categoryId!, this.limit, this.offset).subscribe((data) => {
      // comparar si existen y agregar nuevos
      const newProducts = data.filter(product => !this.products().some(p => p.id === product.id));
      console.log(newProducts);
      this.products.update((value) => [...value, ...newProducts]);
      this.offset += this.limit;
    })
  }

}
