import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Workout} from '../entity/workout';
import { Router, ActivatedRoute } from '@angular/router';
import {WorkoutService} from "@/_services/workout.service";

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  // styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  workout: any;
  isLoadingResults = true;

  constructor(private router: Router, private route: ActivatedRoute, private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getWorkoutDetails();
  }

  getWorkoutDetails() {
    this.workoutService.getWorkout(this.route.snapshot.params.id)
      .subscribe((data: any) => {
        this.workout = data;
        console.log(this.workout);
        this.isLoadingResults = false;
      });
  }


}
