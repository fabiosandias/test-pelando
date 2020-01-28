import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { Youtube } from './youtybe';
import { YOUTUBE_API } from '../app.api';

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
    const url = `${YOUTUBE_API}?key=${this.apiKey}&title=${title}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`
    return this.http.get<any>(url, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getByUrl(id, maxResults): Observable<any> {
    const url = `${YOUTUBE_API}?key=${this.apiKey}&id=${id}&order=date&part=snippet&type=video,id&maxResults=${maxResults}`
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
