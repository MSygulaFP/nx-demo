import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './albums/albums.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAlbums from './+state/albums.reducer';
import { AlbumsEffects } from './+state/albums.effects';
import { AlbumsFacade } from './+state/albums.facade';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      fromAlbums.ALBUMS_FEATURE_KEY,
      fromAlbums.albumsReducer
    ),
    EffectsModule.forFeature([AlbumsEffects]),
  ],
  exports: [RouterModule],
  declarations: [AlbumsComponent],
  providers: [AlbumsFacade],
})
export class AlbumsModule {}
