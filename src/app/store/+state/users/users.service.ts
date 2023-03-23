import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersEntity } from './users.models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UsersEntity[]> {
    return this.httpClient.get<UsersEntity[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
  }
}
