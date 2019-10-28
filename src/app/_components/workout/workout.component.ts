import { Component, OnInit } from '@angular/core';
import {Workout} from '../entity/workout';
import {Observable} from 'rxjs';
import {WorkoutService} from "@/_services/workout.service";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  // styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workouts: Observable<Workout[]>;


  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workouts = this.workoutService.getWorkouts();
  }

}
