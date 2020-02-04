import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/services/youtube.service';
import { YoutubeInterface } from '../../services/youtube.interface';
import { LocalstorageService } from '../../services/localstorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tes-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  title: string;
  sub: any;
  videos: YoutubeInterface[] = [];
  video: any = {};

  constructor(
    private router: Router,
     private route: ActivatedRoute,
     public youtube: YoutubeService,
     private localStorage: LocalstorageService,
     private toast: ToastrService,
     ) {}

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.title = params['titleSearch'];
      this.searchVideoByTitle(params['titleSearch']);
   });
  }

  searchVideoByTitle(title: string) {
    this.youtube.getByTitle(title, 4).subscribe(response => {

      for (let res in response.items) {
        this.videos.push({
          id: response.items[res].id.videoId,
          title: response.items[res].snippet.title,
          thumbnails: response.items[res].snippet.thumbnails.high.url,
          play: 2
        }) 
      }
  });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  saveVideoAndBackHome() {
    debugger;
    if (this.localStorage.save(this.video)) {
      this.router.navigate(['/home']);
      this.toast.success('Video salvo com sucesso!', 'Sucesso!');
    } else {
      this.toast.error('Este video não existe ou ja foi salvo na sua lista!', 'Opss!');
    }
  }

  selectVideo(video) {
    debugger;
    this.video = video;
  }

}
