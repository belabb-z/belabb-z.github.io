import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoundComponent implements OnInit {

  @Input() thumbnail: string = null!;
  @Input() title: string = null!;
  @Input() artist: string = null!;

  constructor() { }

  ngOnInit(): void {;
  }

}
