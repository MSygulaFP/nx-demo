import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AlbumsActions from './albums.actions';
import { AlbumsEffects } from './albums.effects';

describe('AlbumsEffects', () => {
  let actions: Observable<Action>;
  let effects: AlbumsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AlbumsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AlbumsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AlbumsActions.initAlbums() });

      const expected = hot('-a-|', {
        a: AlbumsActions.loadAlbumsSuccess({ albums: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
