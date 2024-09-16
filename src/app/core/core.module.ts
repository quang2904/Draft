import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '../../config/config';
import { environment as env } from '@/config';
import { User } from '../user';
import { Employee } from '../employee';
import { Role } from '../role';
import { Organization } from '../organization';
import { Income } from '../income';
import { Expense } from '../expense';
import { EmployeeSetting } from '../employee-setting';
import { RequestContextMiddleware } from './context';
import { UserOrganization } from '../user-organization';
import { OrganizationDepartment } from '../organization-department';
import { OrganizationRecurringExpense } from '../organization-recurring-expense';
import { EmployeeRecurringExpense } from '../employee-recurring-expense';

const entities = [
  User,
  Employee,
  Role,
  Organization,
  Income,
  Expense,
  EmployeeSetting,
  UserOrganization,
  OrganizationDepartment,
  OrganizationRecurringExpense,
  EmployeeRecurringExpense,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        ...env.database,
        entities,
        // subscribers,
        // migrations,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
