import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostsEntity } from './posts.models';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<PostsEntity[]> {
    return this.httpClient.get<PostsEntity[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }
}
