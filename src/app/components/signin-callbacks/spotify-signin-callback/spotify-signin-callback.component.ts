import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyAuthService } from '../../../services/spotify-auth.service';

@Component({
  template: ``,
})
export class SpotifySigninCallbackComponent implements OnInit {

  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.spotifyAuthService.callback();
    this.router.navigateByUrl('/');
  }

}
