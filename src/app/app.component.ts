import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Log } from 'oidc-client-ts';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { AuthProvider } from './models/auth-provider.model';
import { SpotifyAuthService } from './services/spotify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isSidenavOpen = true;

  public AuthProvider = AuthProvider;

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList = null!;
  ngDestroy$ = new Subject();

  user = {
    spotifyConnected: true,
    deezerConnected: false,
  };

  constructor(
    private readonly translate: TranslateService,
    private readonly titleService: Title,
    private readonly spotifyAuthService: SpotifyAuthService,
    private readonly snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    @Inject(DOCUMENT) document: Document,
  ) {
    translate.setDefaultLang('fr');
    translate.use('fr');
    document.body.lang = 'fr';
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    Log.setLogger(console);
  }

  ngOnInit(): void {
    this.translate.get('TITLE').subscribe(title => {
      this.titleService.setTitle(title);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.ngDestroy$.next();
  }

  authenticate(provider: AuthProvider): void {
    switch (provider) {
      case AuthProvider.Spotify:
        this.spotifyAuthService.authenticate().pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse) {
              this.snackBar.open(this.translate.instant('SPOTIFY_AUTH_UNEXPECTED_ERROR'), 'OK');
            }
            this.snackBar.open(error.message, 'OK');
            return EMPTY;
          }),
          takeUntil(this.ngDestroy$)
        ).subscribe();
        break;
      case AuthProvider.Deezer:
        break;
      default:
        console.error('invalid auth provider');
        break;
    }
  }

}
