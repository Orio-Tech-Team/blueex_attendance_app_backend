import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TokenMiddleware } from './middlewares/token.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { EmployeeModule } from './modules/employee/employee.module';
import { StationModule } from './modules/station/station.module';
import { AttendacneModule } from './modules/attendacne/attendacne.module';
import { CitiesModule } from './modules/cities/cities.module';
import { NotificationModule } from './modules/notification/notification.module';
import { NotificationService } from './modules/notification/notification.service';
import { ShiftModule } from './modules/shift/shift.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { DesignationModule } from './modules/designation/designation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    EmployeeModule,
    StationModule,
    AttendacneModule,
    CitiesModule,
    NotificationModule,
    ShiftModule,
    DepartmentsModule,
    DesignationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .exclude(
        {
          path: '/attendance-app/attendance/getattendancedata/app',
          method: RequestMethod.ALL,
        },
        {
          path: '/attendance-app/attendance/server',
          method: RequestMethod.ALL,
        },
        {
          path: '/attendance-app/attendance/getattendancedata',
          method: RequestMethod.ALL,
        },
        {
          path: '/attendance-app/attendance/manual',
          method: RequestMethod.ALL,
        },
        { path: '/attendance-app/employee/all', method: RequestMethod.ALL },
        { path: '/attendance-app/shift/all', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
