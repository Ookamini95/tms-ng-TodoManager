import c from '@constants'
import { environment as env } from '@env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, switchMap, tap, timer } from 'rxjs';

import { Todo } from '@shared/models/todo.model';
import { TodoAction, TodoUpdateAction } from '@shared/models/actions/todo.action';

const baseUrl = `http://${env.API_HOST}:${env.API_PORT}/todos/`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private _headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  getTodos(): Promise<Todo[]> {
    const getUrl = baseUrl;
    return lastValueFrom(
      timer(c.DELAY).pipe(
        switchMap(_ => {
          return this.http
          .get(getUrl, { headers: this._headers() })
          .pipe(
            tap(console.log),
          )
        })
      )
    );
  }
  deleteTodo(id: number): Promise<Todo> {
    const deleteUrl = baseUrl + id;
    return lastValueFrom(
      this.http
        .delete(deleteUrl, { headers: this._headers() })
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
          { headers: this._headers() })
        .pipe(
          tap(console.log),
        )
    );
  }
  patchTodo(a: TodoUpdateAction) {
    const patchUrl = baseUrl + a.id;
    if (!a.data) return;
    return lastValueFrom(
      this.http
        .patch(
          patchUrl,
          a.data,
          { headers: this._headers() }
        )
        .pipe(
          tap(console.log),
        )
    );
  }
}
