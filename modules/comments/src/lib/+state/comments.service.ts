import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentsEntity } from './comments.models';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  constructor(private httpClient: HttpClient) {}

  getComments(postId: number): Observable<CommentsEntity[]> {
    return this.httpClient.get<CommentsEntity[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
  }
}
