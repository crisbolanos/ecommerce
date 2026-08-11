import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  imports: [],
  templateUrl: './img.html',
  styleUrl: './img.scss',
})
export class Img {

  @Input() img: string = "";
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = './images/default.png';

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoad() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
