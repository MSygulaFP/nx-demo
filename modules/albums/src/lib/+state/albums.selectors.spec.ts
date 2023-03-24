import { AlbumsEntity } from './albums.models';
import {
  albumsAdapter,
  AlbumsPartialState,
  initialAlbumsState,
} from './albums.reducer';
import * as AlbumsSelectors from './albums.selectors';

describe('Albums Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAlbumsId = (it: AlbumsEntity) => it.id;
  const createAlbumsEntity = (id: number, title = '') =>
    ({
      id,
      title: title || `title-${id}`,
    } as AlbumsEntity);

  let state: AlbumsPartialState;

  beforeEach(() => {
    state = {
      albums: albumsAdapter.setAll(
        [createAlbumsEntity(1), createAlbumsEntity(2), createAlbumsEntity(3)],
        {
          ...initialAlbumsState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Albums Selectors', () => {
    it('selectAllAlbums() should return the list of Albums', () => {
      const results = AlbumsSelectors.selectAllAlbums(state);
      const selId = getAlbumsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AlbumsSelectors.selectEntity(state) as AlbumsEntity;
      const selId = getAlbumsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAlbumsLoaded() should return the current "loaded" status', () => {
      const result = AlbumsSelectors.selectAlbumsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAlbumsError() should return the current "error" state', () => {
      const result = AlbumsSelectors.selectAlbumsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
