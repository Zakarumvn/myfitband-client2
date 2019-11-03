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

  getCalories() {
      if(this.workout){
          var dateDiff = Math.abs(new Date(this.workout.stopDT).getTime() - new Date(this.workout.startDT).getTime());
          var minutesOfWorkout = Math.floor(dateDiff / 60000);
          if(minutesOfWorkout < 30) return "Twój trening trwał krócej niż 30 minut. " +
              "Organizm zużywał wyłącznie zgromadzone zapasy energii, " +
              "dlatego ilość spalonych przez Ciebie kalorii wynosi 0.";

          var calories = ((minutesOfWorkout - 30) / 60) * this.workout.sport.kcalPerHour;

          return "Efektywny czas Twojego treningu w minutach to: " + (minutesOfWorkout - 30) + ". W tym czasie udało Ci się spalić " + calories +" kcal.";
      }
  }


}
