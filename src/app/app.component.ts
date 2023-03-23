import { Component, inject, OnInit } from '@angular/core';
import { UsersFacade } from './store/+state/users/users.facade';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'nx-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private usersFacade = inject(UsersFacade);
  private router = inject(Router);
  private location = inject(Location);

  isOnRoot$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url === '/')
  );

  ngOnInit() {
    this.usersFacade.init();
  }

  goBack() {
    this.location.back();
  }
}
