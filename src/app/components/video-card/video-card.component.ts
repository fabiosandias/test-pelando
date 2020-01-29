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

  title = 'dummyApp-YTIFrameAPI';

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public player: any;
  public reframed: Boolean = false;



  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.init();

  }



  /* 2. Initialize method for YT IFrame API */
  init() {

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    
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

  onPlayer() {
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
    debugger
    if (!this.video.play) {
      this.video.play = true;
      this.player.playVideo();
    } else {
      this.video.play = false;
      this.player.pauseVideo();
    }
  }



  startVideo() {
    debugger;
    this.player = new (<any>window).YT.Player(`player`, {
      videoId: this.video.id,
      host: 'https://www.youtube.com',
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
        origin: 'http://localhost:4200',
      },
      events: {
        'onError': (event) => { this.onPlayerError(event) },
        'onReady': (event) => { this.onPlayerReady(event); },
        'onStateChange': (event) => { this.onPlayerStateChange(event); }
      }

      
    });

    this.player.loadVideoById(this.video.id, 5, "large");
  }

  onPlayerReady(event) {
      event.target.pauseVideo();
  }

  onPlayerStateChange(event) {
    debugger;
    switch (event.data) {
      case (<any>window).YT.PlayerState.PLAYING:
        event.target.playVideo()
        break;
      case (<any>window).YT.PlayerState.PAUSED:
  
        event.target.pauseVideo()
        break;
      case (<any>window).YT.PlayerState.ENDED:
        console.log('ended ');
        break;
    };

    // bind events
    // event.target.playVideo();

    // var pauseButton = document.getElementById("pause-button");
    // pauseButton.addEventListener("click", function() {
    //   this.player.pauseVideo();
    // });

    // var stopButton = document.getElementById("stop-button");
    // stopButton.addEventListener("click", function() {
    //   this.player.stopVideo();
    // });
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };

}
