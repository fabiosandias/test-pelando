import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { YoutubeInterface } from '../../services/youtube.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const setting_play = {
  PLAYER: 1,
  PAUSE: 2
};

@Component({
  selector: 'tes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public videos: YoutubeInterface
  public tag:any;
  public YT: any;
  public player: any[];
  public reframed: Boolean = false;
  
  constructor(
    private youtube: YoutubeService, 
    private localStorage: LocalstorageService,
    private toast: ToastrService,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.videos = this.localStorage.getAll();
  }


  seachVideoByUrl(id) {
    this.youtube.getByUrl(id, 4).subscribe(response => {
        const video: YoutubeInterface = {
          id: response.items[0].id,
          title: response.items[0].snippet.title,
          thumbnails: response.items[0].snippet.thumbnails.high.url,
          play: 2
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
      if (this.videos[v].id !== video.id) {
        this.videos[v].play = setting_play.PAUSE;
      }
    }
  }

  deleteVideo(video: YoutubeInterface) {
    this.localStorage.deleteVideo(video);
    this.videos = this.localStorage.getAll();
  }

  goToSearchVideoByTitle(title: any) {
    this.router.navigate(['/home/search'], {queryParams: {titleSearch: title}});
  }

}
