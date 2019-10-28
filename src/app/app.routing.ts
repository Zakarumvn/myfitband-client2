import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import {WorkoutComponent} from "@/_components/workout/workout.component";
import {WorkoutDetailsComponent} from "@/_components/workout-details/workout-details.component";
import {WorkoutMapComponent} from "@/_components/workout-map/workout-map.component";
import {PulseChartComponent} from "@/_components/pulse-chart/pulse-chart.component";
import {SettingsComponent} from "@/_components/settings/settings.component";
import {AlertListComponent} from "@/_components/alert-list/alert-list.component";
import {WeightChartComponent} from "@/_components/weight-chart/weight-chart.component";

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'workouts', component: WorkoutComponent,  canActivate: [AuthGuard] },
    { path: 'workout-details/:id', component: WorkoutDetailsComponent,  canActivate: [AuthGuard] },
    { path: 'workout-map/:id', component: WorkoutMapComponent,  canActivate: [AuthGuard] },
    { path: 'pulse-chart/:id', component: PulseChartComponent ,  canActivate: [AuthGuard]},
    { path: 'settings', component: SettingsComponent ,  canActivate: [AuthGuard]},
    { path: 'alert-list', component: AlertListComponent,  canActivate: [AuthGuard] },
    { path: 'weight-chart', component: WeightChartComponent,  canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);