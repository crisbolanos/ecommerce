import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Img } from './components/img/img';
import { Product } from './components/product/product';
import { FormsModule } from '@angular/forms';
import { IProduct } from './models/product.modul';

@Component({
  selector: 'app-root',
  imports: [Img, Product, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  imgParent = '';

  products: IProduct[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: '  /images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: '/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      image: './images/books.jpg'
    },
  ];

  onLoaded(img: string) {
    console.log('log padre', img);
  }
}
