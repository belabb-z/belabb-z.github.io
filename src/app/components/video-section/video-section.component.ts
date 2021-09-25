import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { ISearchResult } from 'src/app/models/search-result.model';
import { YoutubeVideoService } from 'src/app/services/youtube-video.service';

@Component({
  selector: 'app-video-section',
  templateUrl: './video-section.component.html',
  styleUrls: ['./video-section.component.scss']
})
export class VideoSectionComponent implements OnInit {

  @Input() ready = false;
  @Input() id = '';

  @ViewChild('player', { read: ElementRef }) player: ElementRef<HTMLElement> | null = null;

  hasPlayer = false;

  constructor(
    private readonly videoService: YoutubeVideoService
  ) { }

  ngOnInit(): void {
  }

  loadVideo(event: CdkDragDrop<ISearchResult>): void {
    const videoData = event.item.data as ISearchResult;
    let player: YT.Player;
    
    this.ready = false;
    if (!this.hasPlayer) {
      player = this.videoService.loadVideoPlayer(
        this.player!.nativeElement,
        videoData.videoId,
        {
          height: this.player?.nativeElement.getBoundingClientRect().height! - 16,
          width: this.player?.nativeElement.getBoundingClientRect().width! - 16
        });
    }
  }

}
