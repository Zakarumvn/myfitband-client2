import {User} from './user';

export class NotificationDate {
  date: Date;
  settingId: number;

  constructor(private notificationTime: Date, private id: number) {
    this.date = notificationTime;
    this.settingId = id;
  }

}
