import { Component, OnInit, inject, signal } from '@angular/core';
import { Auth } from '../../../services/auth';
import { IUsers } from '../../../models/users.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private authServices = inject(Auth)
  user = signal<IUsers | null>(null);



  ngOnInit() {
    this.authServices.user$
      .subscribe(data => {
        this.user.set(data);
      })
  }

}
