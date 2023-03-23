import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AlbumsActions from './albums.actions';

import { catchError, map, of, switchMap } from 'rxjs';
import { AlbumsService } from './albums.service';

@Injectable()
export class AlbumsEffects {
  private actions$ = inject(Actions);
  private albumsService = inject(AlbumsService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.initAlbums),
      switchMap(() =>
        this.albumsService.getAlbums().pipe(
          map((albums) => AlbumsActions.loadAlbumsSuccess({ albums })),
          catchError((error) => {
            console.error('Error', error);
            return of(AlbumsActions.loadAlbumsFailure({ error }));
          })
        )
      )
    )
  );
}
