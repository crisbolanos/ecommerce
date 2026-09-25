import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Icategory } from '../models/product.modul';

@Injectable({
  providedIn: 'root',
})
export class Categories {
  private http = inject(HttpClient)
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/categories';

  limit = 10;
  offset = 0;

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Icategory[]>(`${this.apiUrl}`, { params });
    this.offset += this.limit;
  }
}
