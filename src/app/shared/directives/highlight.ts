import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {

  private element = inject(ElementRef);

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.background = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.background = 'none';
  }

}
