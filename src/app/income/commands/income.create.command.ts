import { ICommand } from '@nestjs/cqrs';
import { IncomeCreateInput as IIncomeCreateInput } from '@/contracts';

export class IncomeCreateCommand implements ICommand {
  static readonly type = '[Income] Create';

  constructor(public readonly input: IIncomeCreateInput) {}
}
