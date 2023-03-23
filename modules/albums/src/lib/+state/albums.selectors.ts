import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ALBUMS_FEATURE_KEY,
  AlbumsState,
  albumsAdapter,
} from './albums.reducer';

// Lookup the 'Albums' feature state managed by NgRx
export const selectAlbumsState =
  createFeatureSelector<AlbumsState>(ALBUMS_FEATURE_KEY);

const { selectAll, selectEntities } = albumsAdapter.getSelectors();

export const selectAlbumsLoaded = createSelector(
  selectAlbumsState,
  (state: AlbumsState) => state.loaded
);

export const selectAlbumsError = createSelector(
  selectAlbumsState,
  (state: AlbumsState) => state.error
);

export const selectAllAlbums = createSelector(
  selectAlbumsState,
  (state: AlbumsState) => selectAll(state)
);

export const selectAlbumsEntities = createSelector(
  selectAlbumsState,
  (state: AlbumsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAlbumsState,
  (state: AlbumsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAlbumsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
