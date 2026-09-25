import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs';
import { IFile } from '../models/file.model';

@Injectable({
  providedIn: 'root',
})
export class Files {
  private http = inject(HttpClient);
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/files';

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, {
      responseType: 'blob'
    })
      .pipe(
        tap(content => {
          const blob = new Blob([content], { type });
          saveAs(blob, name);
        }),
        map(() => true)
      )
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);
    return this.http.post<IFile>(`${this.apiUrl}/upload`, dto, {
      // headers: {
      //   'content-type': 'multipart/form-data'
      // }
    });
  }

}
