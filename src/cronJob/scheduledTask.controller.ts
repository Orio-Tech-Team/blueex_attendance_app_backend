import { EmployeeService } from 'src/modules/employee/employee.service';
import { fetchUser } from './fetchUsers';
import { Controller } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cron = require('node-cron');
const schedule = '* * * * * *';
// '0 0 0 * * *'
//
@Controller('')
export class ScheduledTask {
  constructor(private readonly employeeService: EmployeeService) {}
  //
  scheduleTask() {
    cron
      .schedule(schedule, async () => {
        console.log('Cron Job Started');
        const users = await fetchUser();

        const employee = await this.employeeService.findByEmployeeNumber(
          users[0].emp_id,
        );
        console.log(employee);
        console.log('Cron Job Ended');
      })
      .start();
  }
  onApplicationBootstrap() {
    this.scheduleTask();
  }
}
