import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'tes-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

  searchValue: string = '';
  videos: YoutubeService[];

  @Output() seachVideoByUrl = new EventEmitter()


  constructor(private youtube: YoutubeService, private localStorage: LocalstorageService) { }


  ngOnInit() {

  }

  isUrl() {
    if (!this.searchValue) {
      return false;
    }

    const regex = new RegExp(/( *?https{0,1}:\/\/w{0,3}.*| *?ftp:\/\/w{0,3}.*| *?\n|^$)/g)
    return !!regex.test(this.searchValue);
  }

  searchVideo() {
    if (this.isUrl()) {
      const id = this.getUrlId(this.searchValue)
      if (id) {
        this.seachVideoByUrl.emit(id);
      }
        
    } else {
      alert('Estamos fazendo teste')
    }
  }

  getUrlId(url) {
    url = url.split('=');
    return url[1];
  }


}
