import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { IProduct, IcreateProductDTO, IupdateProductDTO } from '../models/product.modul';
import { catchError, throwError, map, zip } from 'rxjs';
import { checkTime } from '../interceptors/time-interceptor';

@Injectable({
  providedIn: 'root',
})
export class ProductsS {
  private http = inject(HttpClient);

  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api';

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<IProduct[]>(`${this.apiUrl}/categories/${categoryId}/products`, {
      params
    })
  }

  getByCategoryPage(categoryId: string, limit: number, offset: number) {
    return this.http.get<IProduct[]>(`${this.apiUrl}/categories/${categoryId}/products`, {
      params: {
        limit,
        offset
      }
    })
  }

  getAllProcudcts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`, {
      params, context: checkTime()
    })
      .pipe(
        map(products => products.map(item => ({
          ...item,
          taxes: item.price * 0.19
        })))
      )
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => new Error("Producto no encontrado"));
          }
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => new Error("Error interno del servidor"));
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => new Error("No autorizado"));
          }
          return throwError('Ups algo salio mal');
        })
      )
  }

  create(data: IcreateProductDTO) {
    return this.http.post<IProduct>(`${this.apiUrl}/products`, data);
  }

  update(id: string, dto: IupdateProductDTO) {
    return this.http.put<IProduct>(`${this.apiUrl}/products/${id}`, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }

  getProdutsBypage(limit: number, offset: number) {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`, {
      params: {
        limit,
        offset
      }
    });
  }

  fetchReadAndUpdate(id: string, dto: IupdateProductDTO) {
    return zip(this.getProduct(id), this.update(String(id), dto));
  }
}
