import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import reframe from 'reframe.js';

@Component({
  selector: 'tes-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
  styles: [`.max-width-1024 { max-width: 1024px; margin: 0 auto; }`]
})
export class VideoCardComponent implements OnInit {

  isResult: boolean = false;
  @Input() video;
  @Input() index;
  @Input() tag;
  public safeURL: SafeResourceUrl;

  @Output() stopVideo = new EventEmitter();
  @Output() deleteVideo = new EventEmitter();



  constructor(private _sanitizer: DomSanitizer){}

  ngOnInit() {

    // let firstScriptTag = document.getElementsByTagName('script')[this.index];
    // firstScriptTag.parentNode.insertBefore(this.tag, firstScriptTag);

    // window['onYouTubeIframeAPIReady'] = (e) => {
    //   this.YT = window['YT'];
    //   this.reframed = false;
    //   this.player = new window['YT'].Player('player', {
    //     videoId: this.video.id,
    //     events: {
    //       'onStateChange': this.onPlayerStateChange.bind(this),
    //       'onError': this.onPlayerError.bind(this),
    //       'onReady': (e) => {
    //         if (!this.reframed) {
    //           this.reframed = true;
    //           reframe(e.target.a);
    //         }
    //       }
    //     }
    //   });
    // };
  }

  getUrlEmbad(id) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}?autoplay=1&controls=0`);
    return this.safeURL;
  }

  stopAllVideo(video) {
    this.stopVideo.emit(video)
  }

  deleteVideoById(video) {
    this.deleteVideo.emit(video)
  }


  // onPlayerStateChange(event) {
  //   switch (event.data) {
  //     case window['YT'].PlayerState.PLAYING:
  //       if (this.cleanTime() == 0) {
  //         console.log('started ' + this.cleanTime());
  //       } else {
  //         console.log('playing ' + this.cleanTime())
  //       };
  //       break;
  //     case window['YT'].PlayerState.PAUSED:
  //       if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
  //         console.log('paused' + ' @ ' + this.cleanTime());
  //       };
  //       break;
  //     case window['YT'].PlayerState.ENDED:
  //       console.log('ended ');
  //       break;
  //   };
  // };
  // //utility
  // cleanTime() {
  //   return Math.round(this.player.getCurrentTime())
  // };
  // onPlayerError(event) {
  //   switch (event.data) {
  //     case 2:
  //       console.log('' + this.video)
  //       break;
  //     case 100:
  //       break;
  //     case 101 || 150:
  //       break;
  //   };
  // };

  onPlayerStateChange() {
    if (!this.video.play) {
      this.video.play = true;
    } else {
      this.video.play = false;
    }
  }

}
