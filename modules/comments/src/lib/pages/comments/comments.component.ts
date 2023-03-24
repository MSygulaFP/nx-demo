import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommentsFacade } from '../../+state/comments.facade';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'nx-demo-comments',
  imports: [NgForOf, AsyncPipe],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.html'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  private commentsFacade = inject(CommentsFacade);

  comments$ = this.commentsFacade.allComments$;

  ngOnInit() {
    this.commentsFacade.init();
  }

  ngOnDestroy() {
    this.commentsFacade.reset();
  }
}
