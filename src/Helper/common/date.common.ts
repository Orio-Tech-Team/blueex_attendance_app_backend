import * as moment from 'moment-timezone';
export class GetDate {
  static currentDate() {
    const today = new Date();
    return (
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    );
  }

  static currentTime() {
    const time = moment.tz(Date.now(), 'Asia/Karachi');
    return time.format('HH:mm:ss');
  }
}
