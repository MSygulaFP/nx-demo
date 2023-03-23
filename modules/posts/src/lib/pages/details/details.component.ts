import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsFacade } from '@nx-demo/modules/posts';
import { UsersFacade } from '../../../../../../src/app/store/+state/users/users.facade';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'nx-demo-posts-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  private postsFacade = inject(PostsFacade);
  private usersFacade = inject(UsersFacade);

  post$ = this.postsFacade.selectedPosts$.pipe(
    filter(Boolean),
    tap((post) => this.usersFacade.selectUser(post.userId))
  );

  user$ = this.usersFacade.selectedUsers$;
}
