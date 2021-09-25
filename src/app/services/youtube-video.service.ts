import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeVideoService {

  constructor() { }

  loadVideoPlayer(element: HTMLElement, videoId: string, size: { height: number, width: number }): YT.Player {
    return new YT.Player(element, {
      videoId: videoId,
      height: size.height,
      width: size.width,
      playerVars: {
        enablejsapi: 1,
        modestbranding: 1,
      }
    });
  }

}
