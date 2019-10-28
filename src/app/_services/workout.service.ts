import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private BASE_URL = 'http://localhost:8080/workout';

  constructor(private http: HttpClient) { }

  getWorkouts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/list`);
  }

  getWorkout(workoutId) {
    return this.http.get(`${this.BASE_URL}/${workoutId}`);
  }

  getPulseChart(workoutId) {
    return this.http.get(`${this.BASE_URL}/pulse/${workoutId}`);
  }

  getWeightChart() {
    return this.http.get(`${this.BASE_URL}/weight`);
  }

  getAlerts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/alerts`);
    // return this.getMockAlerts() ;
  }

}
