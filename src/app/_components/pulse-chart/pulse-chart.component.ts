import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutService} from "@/_services/workout.service";
import {SettingsService} from "@/_services/settings.service";

@Component({
  selector: 'app-pulse-chart',
  templateUrl: './pulse-chart.component.html',
  // styleUrls: ['./pulse-chart.component.css']
})
export class PulseChartComponent implements OnInit {
  isLoadingResults = true;
  data;
  pulsesData: Array<number | string> = [];
  physicalProperties: any;
  type = 'LineChart';
  columnNames;
  options;
  title;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private workoutService: WorkoutService,
              private settingService: SettingsService) {
  }

  ngOnInit() {
    this.physicalProperties = this.settingService.getPhysicalProperties()
      .subscribe((data: any) => {
        if (data != null) {
          this.physicalProperties = data;
        }
        console.log(this.physicalProperties);
      });
    this.drawChart(this.getData());
    this.workoutService.getPulseChart(this.route.snapshot.params.id)
      .subscribe((data: any) => {

        for (let p of data) {
          p.value = Number(p.value);
        }
        console.log('pomiary pulsu dla treningu nr ' + this.route.snapshot.params.id);
        this.isLoadingResults = false;
        if (data.length > 0 && this.physicalProperties != null) {
          this.drawChart(this.prepareSeries(data));
        }
      });
  }

  drawChart(data) {
    this.data = data;
    this.type = 'LineChart';
    this.columnNames = this.prepareColumnNames();
    this.options = {
      width: 1000,
      height: 500
    };

  }

  getData() {
    return [
      ['7:45', 10],
      ['7:46', 10],
      ['7:47', 10],
      ['7:48', 26],
      ['7:49', 10],
      ['7:49', 10],
      ['7:49', 10],
      ['7:49', 10]
    ];
  }

  prepareSeries(data) {
    for (let i = 0; i < data.length; i++) {
      this.pulsesData.push([data[i].date as unknown as string,
        data[i].value,
        this.physicalProperties.relaxPulse === undefined ? 0 : this.physicalProperties.relaxPulse as unknown as string,
        this.physicalProperties.stressPulse === undefined ? 0 : this.physicalProperties.stressPulse as unknown as string
      ] as unknown as number);
    }
    // if (this.physicalProperties.relaxPulse && this.physicalProperties.stressPulse) {
    //   return [
    //     this.pulsesData,
    //     this.physicalProperties.relaxPulse,
    //     this.physicalProperties.stressPulse
    //   ];
    // }
    return this.pulsesData;
  }

  prepareColumnNames() {
    return ['Godzina', 'Odczyt', 'Tętno spoczynkowe', 'Tętno maksymalne'];

    if (this.physicalProperties.relaxPulse == null || this.physicalProperties.stressPulse == null) {
      return ['Godzina', 'Odczyt'];
    }
  }
}
