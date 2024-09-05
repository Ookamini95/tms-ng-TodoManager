import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import * as MockData from "../../tests/mock/todo.data.json"
import { catchError, lastValueFrom, of, switchMap, tap } from 'rxjs';
import { Todo } from '@shared/models/todo.model';

// TODO server ep + env
const baseUrl = `http://localhost:3000`; // `http://${env.API_HOST}:${env.API_PORT}`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private getRequestHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getTodos() {
    return lastValueFrom(
      this.http
        .get(baseUrl, { headers: this.getRequestHeaders() })
        // TODO temp pipe for mock data
        .pipe(
          tap(console.log),
          switchMap((_) => of(MockData.todos as Todo[])),
          catchError((_) => of(MockData.todos as Todo[]))
        )
    );
  }
}
