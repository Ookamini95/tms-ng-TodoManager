import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { lastValueFrom, tap } from 'rxjs';
import { Todo } from '@shared/models/todo.model';
import { TodoAction, TodoUpdateAction } from '@shared/models/actions/todo.action';

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
  deleteTodo(id: number): Promise<Todo> {
    const deleteUrl = baseUrl + id;
    return lastValueFrom(
      this.http
        .delete(deleteUrl, { headers: this.getRequestHeaders() })
        .pipe(
          tap(console.log),
        )
    );
  }
  postTodo(a: TodoAction) {
    const postUrl = baseUrl;
    if (!a.data) return;
    return lastValueFrom(
      this.http
        .post(
          postUrl,
          {
            ...a.data
          },
          { headers: this.getRequestHeaders() })
        .pipe(
          tap(console.log),
        )
    );
  }
  patchTodo(a: TodoUpdateAction) {
    const patchUrl = baseUrl + a.id;
    console.log("patch1", patchUrl);
    if (!a.data) return;
    return lastValueFrom(
      this.http
        .patch(
          patchUrl,
          a.data,
          { headers: this.getRequestHeaders() }
        )
        .pipe(
          tap(console.log),
        )
    );
  }
}
