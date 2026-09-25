import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '../../../services/store';
import { IUsers } from '../../../models/users.model';

import { Auth } from '../../../services/auth';
import { Users } from '../../../services/users'
import { switchMap, zip, tap } from "rxjs"
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Categories } from '../../../services/categories';
import { Icategory } from '../../../models/product.modul';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit {

  activeMenu = false;
  counter = 0;
  // token = signal<string>('');
  profile = signal<IUsers | null>(null);
  categories = signal<Icategory[]>([]);

  private storeService = inject(Store);
  private authService = inject(Auth);
  private usersService = inject(Users);
  private categoriesService = inject(Categories);
  private router = inject(Router);

  ngOnInit() {
    this.storeService.myCart$
      .subscribe((products) => {
        this.counter = products.length;
      });
    this.getAllCategories();
    this.authService.user$
      .subscribe(data => {
        this.profile.set(data)
      })
  }

  toogleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.login('john@mail.com', 'changeme')
      .pipe(
        switchMap(() => this.authService.profile())
      )
      .subscribe(() => {
        this.router.navigate(['/profile']);
        // this.profile.set(rta);
      })
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories.set(data);
      })
  }

  logout() {
    this.authService.logout();
    this.profile.set(null);
    this.router.navigate(['/home']);
  }

}
