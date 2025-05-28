import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from '@nestjs/class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsNotBlank implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.trim() !== "" // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) should not be blank!';
  }
}


@ValidatorConstraint({ name: 'customText', async: false })
export class GreaterThanZero implements ValidatorConstraintInterface {
  validate(num: number, args: ValidationArguments) {
    return num > 0 // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) should not be blank!';
  }
}