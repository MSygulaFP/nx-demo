import { createAction, props } from '@ngrx/store';
import { AlbumsEntity } from './albums.models';

export const initAlbums = createAction('[Albums Page] Init');

export const loadAlbumsSuccess = createAction(
  '[Albums/API] Load Albums Success',
  props<{ albums: AlbumsEntity[] }>()
);

export const loadAlbumsFailure = createAction(
  '[Albums/API] Load Albums Failure',
  props<{ error: string | null }>()
);
