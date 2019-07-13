import { KeyValuePair, Message } from '..';
import { ValidationFunction } from './ConstraintValidationFunctions';
import { VALIDATION_CONSTRAINTS_STATEMENT_MESSAGE } from './ValidationConstraints';

// tslint:disable-next-line
export const VALIDATION_FUNCTION_STATEMENT_MESSAGES: ValidationFunction<
  Message[]
> = function(validationPair: KeyValuePair) {
  const { value, key } = validationPair;
  if (value && value.length > 0) {
    value.forEach((message: Message) => {
      this.validate(message, VALIDATION_CONSTRAINTS_STATEMENT_MESSAGE, key);
    });
  }
};

// tslint:disable-next-line
export const VALIDATION_FUNCTION_CHECK_DUPLICATES: ValidationFunction<
  string[]
> = function(validationPair: KeyValuePair) {
  const { value, key } = validationPair;
  const collectedStrings: string[] = [];
  if (value && value.length > 0) {
    value.forEach((stringValue: string) => {
      if (collectedStrings.includes(stringValue)) {
        this.pushError(
          `value '${stringValue}' in array '${key}' is supposed to have unique values but it does not`
        );
      } else {
        collectedStrings.push(stringValue);
      }
    });
  }
};
