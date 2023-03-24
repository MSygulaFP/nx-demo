import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import * as AlbumsSelectors from './albums.selectors';

@Injectable()
export class AlbumsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(AlbumsSelectors.selectAlbumsLoaded));
  allAlbums$ = this.store.pipe(select(AlbumsSelectors.selectAllAlbums));

  init() {
    this.store.dispatch(AlbumsActions.initAlbums());
  }
}
