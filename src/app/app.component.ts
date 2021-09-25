import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public ready = false;

  public resultsLoading = false;

  public searchInputControl = new FormControl('');
  public searchInputQuery$ = new Subject<string>();

  constructor(
    private readonly scriptLoaderService: ScriptLoaderService
  ) { }

  ngOnInit(): void {
    of(this.scriptLoaderService.loadScript('youtube'))
      .subscribe(() => {
        this.ready = true;
      });
  }

  public trackSwitchLabel(value: number): string {
    if (value < 50) {
      return '<';
    }
    if (value === 50) {
      return '|';
    }
    if (value > 50) {
      return '>';
    }
    return '?';
  }

  public search(): void {
    this.searchInputQuery$.next(this.searchInputControl.value);
  }

}
