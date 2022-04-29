import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit, OnDestroy {

  private ngDestroy$ = new Subject();

  searchParams = new FormGroup({
    query: new FormControl(''),
    withSpotify: new FormControl(false),
    withDeezer: new FormControl({
      value: false,
      disabled: true,
    }),
  })

  constructor(
    private readonly spotifyAuthService: SpotifyAuthService,
  ) { }

  ngOnInit(): void {
    this.spotifyAuthService.hasToken().pipe(
      takeUntil(this.ngDestroy$),
    ).subscribe(hasToken => {
      if (hasToken) {
        this.searchParams.controls.withSpotify.enable();
        this.searchParams.controls.withSpotify.setValue(true);
      } else {
        this.searchParams.controls.withSpotify.disable();
        this.searchParams.controls.withSpotify.setValue(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }

  search(): void {
    console.error('search');
  }

}
