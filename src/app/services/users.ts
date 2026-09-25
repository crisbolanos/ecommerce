import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreateUserDTO, IUsers } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class Users {

  private http = inject(HttpClient);
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/users';

  create(dto: ICreateUserDTO) {
    return this.http.post<IUsers>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<IUsers[]>(this.apiUrl);
  }

}
