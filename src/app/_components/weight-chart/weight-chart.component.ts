import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkoutService} from "@/_services/workout.service";

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  // styleUrls: ['./weight-chart.component.css']
})
export class WeightChartComponent implements OnInit {
  isLoadingResults = true;
  data;
  weightData: Array<number | string> = [];
  type = 'LineChart';
  columnNames;
  options;
  title;

  constructor(private router: Router,
              private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.drawChart(this.getData());
    this.workoutService.getWeightChart()
      .subscribe((data: any) => {

        for (let p of data) {
          p.value = Number(p.value);
        }
        this.isLoadingResults = false;
        if (data.length > 0) {
          this.drawChart(this.prepareSeries(data));
        }
      });
  }

  drawChart(data) {
    this.data = data;
    this.type = 'LineChart';
    this.columnNames = ['Data', 'Waga'];
    this.options = {
      width: 1000,
      height: 500,
      curveType: 'function', legend: { position: 'bottom' }
    };

  }

  prepareSeries(data) {
    this.wait();
    for (let i = 0; i < data.length; i++) {
      this.weightData.push([data[i].date as unknown as string,
        data[i].value,
      ] as unknown as number);
    }

    return this.weightData;
  }

  getData() {
    return [
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50],
      ['2019-10-20', 50]
    ];
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async wait() {
    await this.sleep(1000);
  }
}
