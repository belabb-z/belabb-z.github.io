import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
    redirect_uri: `${environment.production ? 'https' : this.document.location.protocol}://${this.document.location.host}/spotify-signin-callback`,
    scope: 'user-read-private streaming',
    metadata: {
      issuer: 'https://accounts.spotify.com',
      authorization_endpoint: 'https://accounts.spotify.com/oauth2/v2/auth',
      token_endpoint: 'https://accounts.spotify.com/api/token',
      userinfo_endpoint: 'https://accounts.spotify.com/oidc/userinfo/v1',
      end_session_endpoint: 'https://accounts.spotify.com/oauth2/v2/logout',
      revocation_endpoint: 'https://accounts.spotify.com/oauth2/revoke/v1',
    }
  });

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly http: HttpClient
  ) { }

  authenticate(): void {
    Log.setLogger(console);
    this.oidcClient.signinPopup().then((user) => {
      console.error('authenticated');
      console.error(user);
      this.http.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      }).subscribe((data) => {
        console.error(data);
      });
    }).catch((err: any) => {
      console.error(err);
    });
  }

  callback(): void {
    this.oidcClient.signinPopupCallback().then((user) => {
      console.error('callback');
      console.error(user);
    }).catch((err: any) => {
      console.error(err);
    });

  }
}
