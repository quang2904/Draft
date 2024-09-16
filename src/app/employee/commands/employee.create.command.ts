import { ICommand } from '@nestjs/cqrs';
import { EmployeeCreateInput as IEmployeeCreateInput } from '@/contracts';

export class EmployeeCreateCommand implements ICommand {
  static readonly type = '[Employee] Register';

  constructor(public readonly input: IEmployeeCreateInput) {}
}
