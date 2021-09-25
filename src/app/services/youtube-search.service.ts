import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ISearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeSearchService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public search(query: string): Observable<ISearchResult[]> {
    return this.http.get<GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>>('https://youtube.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 8,
        key: environment.youtubeApiKey,
        safeSearch: 'none',
        type: 'video',
        videoEmbeddable: 'true',
        q: query
      }
    }).pipe(
      map(results => {
        return results.items.map(result => ({
          title: this.decodeHtml(result.snippet.title),
          videoId: result.id.videoId,
          thumbnail: result.snippet.thumbnails.default.url,
        }));
      })
    );
  }

  private decodeHtml(html: string): string {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
}
