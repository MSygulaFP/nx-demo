import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as AlbumsActions from './albums.actions';
import { AlbumsEffects } from './albums.effects';
import { AlbumsFacade } from './albums.facade';
import { AlbumsEntity } from './albums.models';
import {
  ALBUMS_FEATURE_KEY,
  albumsReducer,
  AlbumsState,
} from './albums.reducer';

interface TestSchema {
  albums: AlbumsState;
}

describe('AlbumsFacade', () => {
  let facade: AlbumsFacade;
  let store: Store<TestSchema>;
  const createAlbumsEntity = (id: number, title = ''): AlbumsEntity =>
    ({
      id,
      title: title || `title-${id}`,
    } as AlbumsEntity);

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ALBUMS_FEATURE_KEY, albumsReducer),
          EffectsModule.forFeature([AlbumsEffects]),
        ],
        providers: [AlbumsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AlbumsFacade);
    });

    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAlbums$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAlbums$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    it('allAlbums$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAlbums$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AlbumsActions.loadAlbumsSuccess({
          albums: [createAlbumsEntity(1), createAlbumsEntity(2)],
        })
      );

      list = await readFirst(facade.allAlbums$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
