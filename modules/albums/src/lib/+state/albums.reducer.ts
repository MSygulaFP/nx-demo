import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import { AlbumsEntity } from './albums.models';

export const ALBUMS_FEATURE_KEY = 'albums';

export interface AlbumsState extends EntityState<AlbumsEntity> {
  selectedId?: number;
  loaded: boolean;
  error?: string | null;
}

export interface AlbumsPartialState {
  readonly [ALBUMS_FEATURE_KEY]: AlbumsState;
}

export const albumsAdapter: EntityAdapter<AlbumsEntity> =
  createEntityAdapter<AlbumsEntity>();

export const initialAlbumsState: AlbumsState = albumsAdapter.getInitialState({
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
