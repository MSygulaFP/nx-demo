import { Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as UsersActions from './users.actions';
import { UsersFacade } from './users.facade';
import { UsersEntity } from './users.models';
import { UsersState } from './users.reducer';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AppModule } from '../../../app.module';

interface TestSchema {
  users: UsersState;
}

describe('UsersFacade', () => {
  let facade: UsersFacade;
  let store: Store<TestSchema>;
  const createUsersEntity = (id: number, name = ''): UsersEntity =>
    ({
      id,
      name: name || `name-${id}`,
    } as UsersEntity);

  beforeEach(() => MockBuilder([UsersFacade], [AppModule]));

  beforeEach(() => {
    facade = MockRender(UsersFacade).point.componentInstance;

    store = ngMocks.findInstance(Store);
  });

  it('loadAll() should return empty list with loaded == true', async () => {
    let list = await readFirst(facade.allUsers$);
    let isLoaded = await readFirst(facade.loaded$);

    expect(list.length).toBe(0);
    expect(isLoaded).toBe(false);

    facade.init();

    list = await readFirst(facade.allUsers$);
    isLoaded = await readFirst(facade.loaded$);

    expect(list.length).toBe(0);
    expect(isLoaded).toBe(true);
  });

  it('allUsers$ should return the loaded list; and loaded flag == true', async () => {
    let list = await readFirst(facade.allUsers$);
    let isLoaded = await readFirst(facade.loaded$);

    expect(list.length).toBe(0);
    expect(isLoaded).toBe(false);

    store.dispatch(
      UsersActions.loadUsersSuccess({
        users: [createUsersEntity(1), createUsersEntity(2)],
      })
    );

    list = await readFirst(facade.allUsers$);
    isLoaded = await readFirst(facade.loaded$);

    expect(list.length).toBe(2);
    expect(isLoaded).toBe(true);
  });
});
