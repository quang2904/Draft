import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from '@/app/app.service';
import { AppController } from '@/app/app.controller';
import { CoreModule } from '@/app/core';
import { EmployeeModule } from '@/app/employee';
import { EmployeeRecurringExpenseModule } from '@/app/employee-recurring-expense';
import { EmployeeSettingModule } from '@/app/employee-setting';
import { EmployeeStatisticsModule } from '@/app/employee-statistics';
import { ExpenseModule } from '@/app/expense';
import { IncomeModule } from '@/app/income';
import { OrganizationModule } from '@/app/organization';
import { OrganizationDepartmentModule } from '@/app/organization-department';
import { OrganizationRecurringExpenseModule } from '@/app/organization-recurring-expense';
import { RoleModule } from '@/app/role';
import { UserModule } from '@/app/user';
import { UserOrganizationModule } from '@/app/user-organization';

@Module({
  imports: [
    MulterModule.register(),
    CoreModule,
    EmployeeModule,
    EmployeeRecurringExpenseModule,
    EmployeeSettingModule,
    EmployeeStatisticsModule,
    ExpenseModule,
    IncomeModule,
    OrganizationModule,
    OrganizationDepartmentModule,
    OrganizationRecurringExpenseModule,
    RoleModule,
    UserModule,
    UserOrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor() {}
}
