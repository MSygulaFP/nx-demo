import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodosEntity } from './todos.models';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<TodosEntity[]> {
    return this.httpClient.get<TodosEntity[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
