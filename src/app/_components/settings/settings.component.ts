import { Component, OnInit } from '@angular/core';
import {NotificationDate} from '../entity/notificationDate';
import {Observable} from 'rxjs';
import {Setting} from '../entity/setting';
import set = Reflect.set;
import {DatePipe} from '@angular/common';
import {SettingsService} from "@/_services/settings.service";

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  // styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  settings: Setting;
  vm = this;
  time: any;
  datetime: any;
  showError = false;
  showConfirm = false;

  constructor(private settingService: SettingsService, private datepipe: DatePipe) {
    this.settings = new Setting();
  }

  ngOnInit() {
    this.getSettings();
  }
  getSettings() {
    this.settingService.getSettings()
      .subscribe((data: any) => {
        if (data != null) {
          this.settings = data;
          this.datetime = new Date(data.notificationTime);
          this.time = this.datepipe.transform(this.datetime, 'hh:mm');
          console.log(this.settings);
        } else {
          this.settings = new Setting();
        }
      });
  }

  saveSettings() {
    if(this.validateTime()){
      this.settingService.saveSettings(this.repackDataToSave(), contentHeaders).subscribe(data => {
        console.log('saved settings');
        this.showError = false;
        this.showConfirm = true;
      });
    }

  }

  repackDataToSave() {
    var datetime = new Date('1970-01-01T' + this.time);
    console.log(datetime);
    return new NotificationDate(datetime, this.settings.settingId);
  }

  validateTime(){
    if(this.time){
      var regExp = new RegExp('([01]?[0-9]|2[0-3]):[0-5][0-9]');
      var res = regExp.test(this.time.toString());
      this.showError = !res;
      return res;
    }
  }

}
