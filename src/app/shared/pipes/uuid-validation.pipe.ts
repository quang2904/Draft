import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

/**
 * UUID Validation Pipe
 *
 * Validates UUID passed in request parameters.
 */
@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  /**
   * When user requests an entity with invalid UUID we must return 404
   * error before reaching into the database.
   */
  public transform(value: string, metadata: ArgumentMetadata): string {
    if (!isUUID(value)) {
      throw new NotFoundException();
    }

    return value;
  }
}
