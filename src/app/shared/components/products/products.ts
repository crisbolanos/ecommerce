import { Component, signal, inject, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product/product';
import { IProduct, IcreateProductDTO, IupdateProductDTO } from '../../../models/product.modul';
import { Store } from '../../../services/store';
import { ProductsS } from '../../../services/products';
import { switchMap, zip } from "rxjs"
// 1. Importar la función para registrar los Web Components de Swiper
import { register } from 'swiper/element/bundle';
// Registrar Swiper
register();


@Component({
  selector: 'app-products',
  imports: [Product],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  // 2. Agregar el schema para que Angular no de error con las etiquetas <swiper-container>
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Products {
  private productsService = inject(ProductsS);
  private storeService = inject(Store);

  myShopingCart: IProduct[] = this.storeService.getShopingCart();
  total = 0;
  @Input() products: IProduct[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id) {
      this.onShowDetaild(Number(id));
    }
  };
  @Output() loadMore = new EventEmitter();
  showProductDetail = signal<boolean>(false);
  // Variable para guardar los datos del producto seleccionado
  productChosen: IProduct = {
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
  }

  statusDetail = signal<'loading' | 'success' | 'error' | 'init'>('init');



  onAddToShopingCart(product: IProduct) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail.update((value) => !value);
  }

  onShowDetaild(id: number) {
    this.statusDetail.set('loading');
    if (!this.showProductDetail()) {
      this.showProductDetail.set(true);
    }
    this.productsService.getProduct(String(id)).subscribe((data) => {
      this.productChosen = data;
      this.statusDetail.set('success');
    }, errorMsg => {
      this.statusDetail.set('error');
      window.alert(errorMsg);
    })
  }

  createNewProduct() {
    const product: IcreateProductDTO = {
      title: "Nuevo producto",
      price: 1000,
      images: [''],
      description: "bla bla bla",
      categoryId: 2,
    }
    this.productsService.create(product).subscribe(data => {
      console.log("Creado", data)
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const dto: IupdateProductDTO = {
      title: "Nuevo titulo",
    }
    const id = this.productChosen.id;
    this.productsService.update(String(id), dto).subscribe(data => {
      this.products = this.products.map(product => product.id === id ? data : product)
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(String(id)).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.toggleProductDetail();
    })
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  // Callback hell para evitar varias suscripciones
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(String(product.id), {
          title: "Titulo actualizado",
        }))
      )
      .subscribe(data => {
        console.log(data);
      })

    // Otra forma de hacerlo con zip sin dependencia de la respuesta del servicio
    this.productsService.fetchReadAndUpdate(id, {
      title: "Titulo actualizado",
    })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
        console.log(read, update);
      })
  }

}
