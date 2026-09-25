import { Component, inject, OnInit, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { IProduct } from '../../../models/product.modul'
import { ProductsS } from '../../../services/products';
import { CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
// 1. Importar la función para registrar los Web Components de Swiper
import { register } from 'swiper/element/bundle';
// Registrar Swiper
register();

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
  // 2. Agregar el schema para que Angular no de error con las etiquetas <swiper-container>
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsS);
  private location = inject(Location);

  produdtId: string | null = null;
  product = signal<IProduct | null>(null);

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.produdtId = params.get('id');
          if (this.produdtId) {
            return this.productsService.getProduct(this.produdtId);
          }
          return [null];
        })
      )
      .subscribe(data => {
        this.product.set(data);
      })
  }

  goToBack() {
    this.location.back();
  }

}
