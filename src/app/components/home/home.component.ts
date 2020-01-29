import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { YoutubeInterface } from '../../services/youtube.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'tes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public videos: YoutubeInterface
  public tag:any;
  
  constructor(
    private youtube: YoutubeService, 
    private localStorage: LocalstorageService,
    private toast: ToastrService
  ) {
   
  }

  ngOnInit() {
    this.tag = document.createElement('script');
    this.tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = (<any>window).document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(this.tag, firstScriptTag);

    this.videos = this.localStorage.getAll()
  }


  seachVideoByUrl(id) {
    this.youtube.getByUrl(id, 4).subscribe(response => {
        const video: YoutubeInterface = {
          id: response.items[0].id,
          title: response.items[0].snippet.title,
          thumbnails: response.items[0].snippet.thumbnails.high.url,
          play: false
        }
        if (this.localStorage.save(video)) {
          this.videos = this.localStorage.getAll();
          this.toast.success('Video salvo com sucesso!', 'Sucesso!');
        } else {
          this.toast.error('Este video não existe ou ja foi salvo na sua lista!', 'Opss!');
        }
        
    });
  }


  stopVideo(video: YoutubeInterface) {
    
    for (let v in this.videos) {
      if (this.videos[v].id != video.id) {
        this.videos[v].play = false;
      }
    }
  }

  deleteVideo(video: YoutubeInterface) {
    this.localStorage.deleteVideo(video);
    this.videos = this.localStorage.getAll();
  }

}
