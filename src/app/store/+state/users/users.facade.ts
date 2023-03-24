import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(UsersSelectors.selectUsersLoaded));
  allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));
  selectedUsers$ = this.store.pipe(select(UsersSelectors.selectEntity));

  init() {
    this.store.dispatch(UsersActions.initUsers());
  }

  selectUser(userId: number) {
    this.store.dispatch(UsersActions.selectUser({ userId }));
  }
}
