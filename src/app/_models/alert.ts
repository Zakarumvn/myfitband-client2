export class Alert {
  date: Date;
  type: string;
  description: string;

  constructor(date, type, description) {
    this.date = date;
    this.type = type;
    this.description = description;
  }
}
