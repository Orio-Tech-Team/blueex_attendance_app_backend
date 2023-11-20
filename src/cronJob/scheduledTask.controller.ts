import { EmployeeService } from 'src/modules/employee/employee.service';
import { fetchUser } from './fetchUsers';
import { Controller } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cron = require('node-cron');
const schedule = '0 0 */1 * * *';
//
@Controller('')
export class ScheduledTask {
  constructor(private readonly employeeService: EmployeeService) {}
  // cron job will run at 00:00:00, 04:00:00, 08:00:00, 12:00:00, and 16:00:00
  scheduleTask() {
    cron
      .schedule(schedule, async () => {
        console.log('Cron Job Started');
        const users = await fetchUser();
        for (let i = 0; i < users.length; i++) {
          const employee = await this.employeeService.findByEmployeeNumber(
            users[i].emp_id,
          );
          if (employee == undefined) {
            await this.employeeService.createEmployee(users[i]);
          } else {
            await this.employeeService.updateEmployee(users[i]);
          }
        }
        console.log('Cron Job Ended');
      })
      .start();
  }
  onApplicationBootstrap() {
    this.scheduleTask();
  }
}
