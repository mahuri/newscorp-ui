import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getIdToken } from 'firebase/auth';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { NgAuthService } from '../ng-auth.service';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  apiURL:string = '/movies';
  idToken: string;
  constructor(private http: HttpClient, public ngAuthService: NgAuthService) {
    getIdToken(this.ngAuthService.userState).then((token) => {
      console.log(token);
      this.idToken = token;
    });
  }

  getMovies(): Observable<Movie> {
    return this.http
      .get<Movie>(this.apiURL, 
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.idToken,
            'asdf':'asdf'
          }),
        })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}