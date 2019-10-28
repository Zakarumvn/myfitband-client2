import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationDate} from "@/_components/entity/notificationDate";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private BASE_SETTINGS_URL = 'http://localhost:8080/workout/settings';
  private BASE_URL = 'http://localhost:8080/workout';

  constructor(private http: HttpClient) {
  }

  getSettings() {
    return this.http.get(`${this.BASE_SETTINGS_URL}`);
  }

  saveSettings(setting: NotificationDate, headers) {
    return this.http.post(`${this.BASE_SETTINGS_URL}Notification/save`, setting, headers);
  }

  getPhysicalProperties() {
    return this.http.get(`${this.BASE_URL}/physicalProperties`);
  }
}


