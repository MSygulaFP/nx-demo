import { Action } from '@ngrx/store';

import * as AlbumsActions from './albums.actions';
import { AlbumsEntity } from './albums.models';
import {
  albumsReducer,
  AlbumsState,
  initialAlbumsState,
} from './albums.reducer';

describe('Albums Reducer', () => {
  const createAlbumsEntity = (id: number, title = ''): AlbumsEntity =>
    ({
      id,
      title: title || `title-${id}`,
    } as AlbumsEntity);

  describe('valid Albums actions', () => {
    it('loadAlbumsSuccess should return the list of known Albums', () => {
      const albums = [createAlbumsEntity(1), createAlbumsEntity(2)];
      const action = AlbumsActions.loadAlbumsSuccess({ albums });

      const result: AlbumsState = albumsReducer(initialAlbumsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = albumsReducer(initialAlbumsState, action);

      expect(result).toBe(initialAlbumsState);
    });
  });
});
