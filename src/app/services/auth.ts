import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUsers } from '../models/users.model';
import { ILogin } from '../models/auth.model';
import { tap } from 'rxjs';
import { Token } from './token';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  private user = new BehaviorSubject<IUsers | null>(null);

  user$ = this.user.asObservable();

  private tokenService = inject(Token);

  login(email: string, pass: string) {
    return this.http.post<ILogin>(`${this.apiUrl}/login`, {
      email,
      password: pass,
    })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    return this.http.get<IUsers>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.user.next(user))
    );
  }

  logout() {
    this.tokenService.removeToken();
    this.user.next(null);
  }

}
