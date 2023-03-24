import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsFacade } from '../../+state/posts/posts.facade';
import { UsersFacade } from '@app/store/+state/users/users.facade';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'nx-demo-posts-details',
  templateUrl: './single-post-details.component.html',
  styleUrls: ['./single-post-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePostDetailsComponent {
  private postsFacade = inject(PostsFacade);
  private usersFacade = inject(UsersFacade);

  post$ = this.postsFacade.selectedPosts$.pipe(
    filter(Boolean),
    tap((post) => this.usersFacade.selectUser(post.userId))
  );

  user$ = this.usersFacade.selectedUsers$;
}
