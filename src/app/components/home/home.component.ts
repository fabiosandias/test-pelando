import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'tes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  videos: YoutubeService[];

  constructor(private youtube: YoutubeService) { }


  ngOnInit() {
    this.youtube.getVideos().subscribe(response => this.videos = response);
  }

}
