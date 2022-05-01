import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private readonly translate: TranslateService,
    private readonly titleService: Title,
    private readonly spotifyAuthService: SpotifyAuthService,
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
  }

  ngOnInit(): void {
    this.translate.get('TITLE').subscribe(title => {
      this.titleService.setTitle(title);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  beginAuth(provider: AuthProvider): void {
    switch (provider) {
      case AuthProvider.Spotify:
        this.spotifyAuthService.authenticate();
        break;
      case AuthProvider.Deezer:
        break;
      case AuthProvider.SoundCloud:
        break;
      default:
        console.error('invalid auth provider');
        break;
    }
  }

}
