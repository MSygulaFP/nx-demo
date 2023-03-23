import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import { AlbumsEntity } from './albums.models';

export const ALBUMS_FEATURE_KEY = 'albums';

export interface AlbumsState extends EntityState<AlbumsEntity> {
  selectedId?: string | number; // which Albums record has been selected
  loaded: boolean; // has the Albums list been loaded
  error?: string | null; // last known error (if any)
}

export interface AlbumsPartialState {
  readonly [ALBUMS_FEATURE_KEY]: AlbumsState;
}

export const albumsAdapter: EntityAdapter<AlbumsEntity> =
  createEntityAdapter<AlbumsEntity>();

export const initialAlbumsState: AlbumsState = albumsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialAlbumsState,
  on(AlbumsActions.initAlbums, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AlbumsActions.loadAlbumsSuccess, (state, { albums }) =>
    albumsAdapter.setAll(albums, { ...state, loaded: true })
  ),
  on(AlbumsActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function albumsReducer(state: AlbumsState | undefined, action: Action) {
  return reducer(state, action);
}
