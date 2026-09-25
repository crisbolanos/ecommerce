import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  imports: [],
  templateUrl: './img.html',
  styleUrl: './img.scss',
})
export class Img implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img = "";
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    //mas codigo cuando cambie img
  }
  @Input() alt = "";
  @Output() loaded = new EventEmitter<string>();
  imgDefault = './images/default.png';
  // counter = signal(0);
  // counterFn: number | undefined;

  constructor() {
    //Before render
    //No async -- once time
  }

  ngOnChanges(changes: SimpleChanges) {
    //Before -during render
    //changes  inputs -- times
  }

  ngOnInit() {
    //Before render
    //Async - fetch - promise -- once time
    // this.counterFn = window.setInterval(() => {
    //   this.counter.update(c => c + 1);
    //   console.log('run counter')
    // }, 1000)
  }

  ngAfterViewInit() {
    //After render
    // handler chield
  }

  ngOnDestroy() {
    // delete
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    if (this.img !== this.imgDefault) {
      this.img = this.imgDefault;
    }
  }

  imgLoad() {
    this.loaded.emit(this.img);
  }

}
