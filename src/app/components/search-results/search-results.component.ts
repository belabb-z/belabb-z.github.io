import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap } from 'rxjs/operators';
import { YoutubeSearchService } from 'src/app/services/youtube-search.service';
import { ISearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  private _ready = false;
  @Input() set ready(ready: boolean) {
    this._ready = ready;
  }
  get ready(): boolean {
    return this._ready;
  }

  @Input() query$: Observable<string> | null = null;

  @Output() loading = new EventEmitter<boolean>();

  constructor(
    private readonly searchService: YoutubeSearchService
  ) { }

  public results: ISearchResult[] = [];

  ngOnInit(): void {
    this.query$?.pipe(
      switchMap((query) => {
        this.loading.emit(true);
        return this.searchService.search(query);
        // return of([]).pipe(delay(400));
      })
    ).subscribe({
      next: results => {
        this.loading.emit(false);
        this.results = results;
      },
      error: () => {
        this.loading.emit(false);
      }
    });
  }

}
