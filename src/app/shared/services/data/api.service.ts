import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom, tap } from 'rxjs';
import { Todo } from '@shared/models/todo.model';

// TODO server ep + env
const baseUrl = `http://localhost:3000/todos/`; // `http://${env.API_HOST}:${env.API_PORT}`;

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

  getTodos(): Promise<Todo[]> {
    const getUrl = baseUrl;
    // TODO: toast "An error has occurred, data may not be correctly saved"
    return lastValueFrom(
      this.http
        .get(getUrl, { headers: this.getRequestHeaders() })
        .pipe(
          tap(console.log),
        )
      );
  }
  deleteTodo(id: number): Promise<void> {
    const deleteUrl = baseUrl + id;
    return lastValueFrom(
      this.http
        .delete(deleteUrl, { headers: this.getRequestHeaders()})
        .pipe(
          tap(console.log),
        )
    );
  }
  postTodo() {}
  patchTodo() {}
}
