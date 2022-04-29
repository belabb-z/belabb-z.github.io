import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserManager } from 'oidc-client-ts';
import { bindCallback, defer, from, iif, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, repeatWhen, tap } from 'rxjs/operators';
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
    private readonly http: HttpClient,
    private readonly translate: TranslateService,
  ) { }

  authenticate(): Observable<void> {
    return iif(() => environment.production,
    defer(() => from(this.oidcClient.signinPopup())),
    of({ access_token: environment.spotifyApiKey })).pipe(
      mergeMap(({ access_token }) => this.http.get<{ product: string }>(`https://api.spotify.com/v1/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })),
      tap(({ product }) => {
        if (product !== 'premium') {
          throwError(new Error(this.translate.instant('SPOTIFY_AUTH_ERROR_NOT_PREMIUM')));
        }
      }),
      map(() => undefined)
    );
  }

  callback(): void {
    this.oidcClient.signinPopupCallback().then(() => {
      console.error('callback');
    }).catch((err: any) => {
      console.error(err);
    });
  }

  hasToken(): Observable<boolean> {
    this.oidcClient.events.addUserSignedIn(this.userSignedInCallback);
    const userSignedIn = bindCallback(this.userSignedInCallback);
    
    return from(this.oidcClient.getUser()).pipe(
      repeatWhen(() => userSignedIn()),
      map(user => !!user && !user.expired),
    );
  }

  private userSignedInCallback(): void {
    console.error('userSignedInCallback');
  }
}
