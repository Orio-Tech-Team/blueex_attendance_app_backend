import * as moment from 'moment-timezone';
export class GetDate {
  static currentDate() {
    return moment.tz(Date.now(), 'Asia/Karachi').format('YYYY-MM-DD');
  }

  static currentTime() {
    const time = moment.tz(Date.now(), 'Asia/Karachi').add(2, 'minutes');
    return time.format('HH:mm:ss');
  }
}
