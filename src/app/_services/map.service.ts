import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private BASE_URL = 'http://localhost:8080/workout/map';

  constructor(private http: HttpClient) { }

  getRouteForWorkout(workoutId): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${workoutId}`);

  }
}
