import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Log, UserManager } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {

  private oidcClient = new UserManager({
    authority: 'https://accounts.spotify.com',
    client_id: 'c7663f9634e1478288158ea82d59d9fb',
    redirect_uri: `${environment.production ? 'https' : this.document.location.protocol}://${this.document.location.host}/signin-callback`,
    metadata: {
      issuer: 'https://accounts.spotify.com',
      authorization_endpoint: 'https://accounts.spotify.com/oauth2/v2/auth',
      userinfo_endpoint: 'https://accounts.spotify.com/oidc/userinfo/v1',
      end_session_endpoint: 'https://accounts.spotify.com/oauth2/v2/logout',
    }
  });

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  authenticate(): void {
    Log.setLogger(console);
    this.oidcClient.signinPopup().then((user) => {
      console.log('authenticated');
      console.log(user);
    }).catch((err: any) => {
      console.error(err);
    });
  }

  callback(): void {
    this.oidcClient.signinPopupCallback().then((user) => {
      console.log('callback');
      console.log(user);
    }).catch((err: any) => {
      console.error(err);
    });
  }
}
