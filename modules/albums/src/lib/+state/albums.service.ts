import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlbumsEntity } from './albums.models';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<AlbumsEntity[]> {
    return this.httpClient.get<AlbumsEntity[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }
}
