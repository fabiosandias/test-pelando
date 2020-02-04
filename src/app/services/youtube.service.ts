import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { Youtube } from './youtybe';
import { YOUTUBE_API } from '../app.api';

const METHOD_SEARCH_YOUTUBE = {
  SEARCH: 'search',
  VIDEOS: 'videos'
}
@Injectable({
  providedIn: 'root'
})

export class YoutubeService {

  private apiKey : string = 'AIzaSyAeA1JzwqWQC9uM0d3HwrWvY_ZYjPgZiuo'
  videos: Youtube;

  constructor(private http: HttpClient) { }


  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getByTitle(title, maxResults): Observable<any> {
    const url = `${YOUTUBE_API}${METHOD_SEARCH_YOUTUBE.SEARCH}?key=${this.apiKey}&order=title&part=snippet&q=${title}&maxResults=${maxResults}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getByUrl(id, maxResults): Observable<any> {
    const url = `${YOUTUBE_API}${METHOD_SEARCH_YOUTUBE.VIDEOS}?key=${this.apiKey}&id=${id}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
