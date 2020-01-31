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

  isResult: boolean = false;
  @Input() video: YoutubeInterface;
  @Input() index;
  @Input() tag;
  @Input() instanceYt;
  public safeURL: SafeResourceUrl;

  @Output() stopVideo = new EventEmitter();
  @Output() deleteVideo = new EventEmitter();

  title = 'dummyApp-YTIFrameAPI';

  playerVars = {
    cc_lang_pref: 'en'
  };

  private player;
  private ytEvent;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {


  }

  getUrlEmbad(id) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=0&controls=1`);
    return this.safeURL;
  }

  stopAllVideo(video) {
    this.stopVideo.emit(video)
  }

  deleteVideoById(video) {
    this.deleteVideo.emit(video)
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
  
  // playVideo() {
  //   this.player.playVideo();
  // }
  
  // pauseVideo() {
  //   this.player.pauseVideo();
  // }

}
