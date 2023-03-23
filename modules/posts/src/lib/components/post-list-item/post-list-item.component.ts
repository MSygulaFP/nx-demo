import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostsEntity } from '../../+state/posts/posts.models';

@Component({
  selector: 'nx-demo-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListItemComponent {
  @Input() post!: PostsEntity;
}
