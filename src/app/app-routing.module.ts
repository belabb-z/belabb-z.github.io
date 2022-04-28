import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifySigninCallbackComponent } from './components/signin-callbacks/spotify-signin-callback/spotify-signin-callback.component';

const routes: Routes = [
  {
    path: 'spotify-signin-callback',
    component: SpotifySigninCallbackComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
