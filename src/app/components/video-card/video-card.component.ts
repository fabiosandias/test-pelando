import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeInterface } from '../../services/youtube.interface';

@Component({
  selector: 'tes-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  styles: [`.max-width-1024 { max-width: 1024px; margin: 0 auto; }`]
})
export class VideoCardComponent implements OnInit {

  @Input() video: YoutubeInterface;
  @Input() index;
  @Input() tag;
  @Input() isResult:boolean;  
  @Input() instanceYt;
  public safeURL: SafeResourceUrl;

  @Output() stopVideo = new EventEmitter();
  @Output() deleteVideo = new EventEmitter();
  @Output() saveVideoModal = new EventEmitter();

  title = 'dummyApp-YTIFrameAPI';

  playerVars = {
    cc_lang_pref: 'en'
  };

  private player;
  private ytEvent;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {


  }

  stopAllVideo(video) {
    this.stopVideo.emit(video)
  }

  deleteVideoById(video) {
    this.deleteVideo.emit(video)
  }

  saveVideo(video) {
    this.saveVideoModal.emit(video)
  }

  onPlayer(video) {
    debugger
    if (video.play === 1) {
      this.player.pauseVideo();
    }
    else if (this.video.play !== 1) {
      this.player.playVideo();
    }
  
  }

  onStateChange(event) {
    this.video.play = (event.data < -1 || event.data === 1) ? 1 : 2;
    this.stopAllVideo(this.video);
  }
  savePlayer(player) {
    this.player = player;
  }

}
