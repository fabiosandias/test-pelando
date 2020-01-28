import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { YoutubeInterface } from './youtube.interface';

const STORAGE_KEY = 'STORAGE_KEY';

@Injectable({
  providedIn: 'root'
})


export class LocalstorageService {



  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) { }



  public save(video: YoutubeInterface): void {

    const anotherTodolist = this.storage.get(STORAGE_KEY) || [];

    anotherTodolist.push({
      title: video.title,
      thumbnails: video.thumbnails,
      id: video.id,
      play: video.play
    });
    debugger
    this.storage.set(STORAGE_KEY, anotherTodolist);
  }

  public getAll(): YoutubeInterface {
    return this.storage.get(STORAGE_KEY)
  }

  public deleteVideo(video: YoutubeInterface) {
    const anotherTodolist = this.storage.get(STORAGE_KEY) || [];

    // for (let v in anotherTodolist) {
    //   if (anotherTodolist[v].id != video.id) {
    //     anotherTodolist.splice(parseInt(v), 1);
    //   }
    // }

    anotherTodolist.forEach((item, index) => {
      if (item.id === video.id) {
        anotherTodolist.splice(index, 1);
      }
    });
    this.storage.remove(STORAGE_KEY);

    this.storage.set(STORAGE_KEY, anotherTodolist);
  }
}
