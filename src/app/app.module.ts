import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_components';
import {WorkoutComponent} from "@/_components/workout/workout.component";
import {PulseChartComponent} from "@/_components/pulse-chart/pulse-chart.component";
import {WorkoutDetailsComponent} from "@/_components/workout-details/workout-details.component";
import {WorkoutMapComponent} from "@/_components/workout-map/workout-map.component";
import {SettingsComponent} from "@/_components/settings/settings.component";
import {AlertListComponent} from "@/_components/alert-list/alert-list.component";
import {WeightChartComponent} from "@/_components/weight-chart/weight-chart.component";
import {NgxMaskModule} from "ngx-mask";
import {GoogleChartsModule} from "angular-google-charts";
import { IConfig } from 'ngx-mask';
import {DatePipe} from "@angular/common";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        GoogleChartsModule,
        FormsModule,
        NgxMaskModule.forRoot(options)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent,
        WorkoutComponent,
        WorkoutDetailsComponent,
        WorkoutMapComponent,
        PulseChartComponent,
        SettingsComponent,
        AlertListComponent,
        WeightChartComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        DatePipe,

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };