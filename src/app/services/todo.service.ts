import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/itodo';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // api_url = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${environment.api_url}/todos`);
  }

  addTodo(newTodo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>(`${environment.api_url}/todos`, newTodo);
  }

  editTodo(newTodo: ITodo): Observable<ITodo> {
    return this.http.patch<ITodo>(
      `${environment.api_url}/todos/${newTodo.id}`,
      newTodo
    );
  }
  deleteTodo(todo: ITodo): Observable<ITodo> {
    return this.http.delete<ITodo>(`${environment.api_url}/todos/${todo.id}`);
  }
}
