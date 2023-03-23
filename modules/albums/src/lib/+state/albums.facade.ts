import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import * as AlbumsFeature from './albums.reducer';
import * as AlbumsSelectors from './albums.selectors';

@Injectable()
export class AlbumsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(AlbumsSelectors.selectAlbumsLoaded));
  allAlbums$ = this.store.pipe(select(AlbumsSelectors.selectAllAlbums));
  selectedAlbums$ = this.store.pipe(select(AlbumsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AlbumsActions.initAlbums());
  }
}
