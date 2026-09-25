import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [Nav, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
