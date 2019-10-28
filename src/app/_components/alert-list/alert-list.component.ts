import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Alert} from '../entity/alert';
import {WorkoutService} from "@/_services/workout.service";

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  // styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {
  alerts: Observable<Alert[]>;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.getAlerts();
  }

  getAlerts() {
    this.alerts = this.workoutService.getAlerts();
  }

  showTable() {
    return this.alerts.subscribe(res =>  res.length > 0);
  }
}
