import { AllowedType, Constraint, KeyValuePair, Validator } from '..';

export type ConstraintValidationFunction<T = any> = (
  this: Validator,
  constraintValue: T,
  validationPair: KeyValuePair
) => void;
export type ValidationFunction<T = {}> = (
  this: Validator,
  validationPair: KeyValuePair<T | undefined>
) => void;

export type ConstraintValidationFunctionMap = Record<
  keyof Constraint,
  ConstraintValidationFunction
>;

// tslint:disable-next-line
const required: ConstraintValidationFunction<boolean> = function(
  constraintValue: boolean,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if ((constraintValue && typeof value === 'undefined') || value === null) {
    this.pushError(`'${key}' is required but 'undefined'`);
  }
};

// tslint:disable-next-line
const validate: ConstraintValidationFunction<ValidationFunction> = function(
  constraintValue: ValidationFunction,
  validationPair: KeyValuePair
) {
  constraintValue.call(this, validationPair);
};

// tslint:disable-next-line
const minLength: ConstraintValidationFunction<number> = function(
  constraintValue: number,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;

  if (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    const length =
      typeof value === 'number' ? String(value).length : value.length;
    if (length < constraintValue) {
      this.pushError(
        `'${key}' has to be at least ${constraintValue} characters long but it's length is ${length}`
      );
    }
  } else {
    // this.pushError(`'${key}' is not a type that can have a minimum length`);
  }
};

// tslint:disable-next-line
const maxLength: ConstraintValidationFunction<number> = function(
  constraintValue: number,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;

  if (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    const length =
      typeof value === 'number' ? String(value).length : value.length;
    if (length > constraintValue) {
      this.pushError(
        `'${key}' has to be lower than or equal to ${constraintValue} characters long but it's length is ${length}`
      );
    }
  } else {
    // this.pushError(`'${key}' is not a type that can have a maximum length`);
  }
};

// tslint:disable-next-line
const type: ConstraintValidationFunction<AllowedType> = function(
  constraintValue: AllowedType,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  const valueType = typeof value;
  if (value && valueType !== constraintValue) {
    this.pushError(
      `'${key}' is supposed to be of type '${constraintValue}' but is type '${valueType}'`
    );
  }
};

// tslint:disable-next-line
const isArray: ConstraintValidationFunction<boolean> = function(
  constraintValue: boolean,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if (value && constraintValue !== Array.isArray(value)) {
    this.pushError(
      `'${key}' is ${
        constraintValue
          ? `supposed to be an array but is not`
          : `not supposed to be an array but is`
      }`
    );
  }
};

// tslint:disable-next-line
const min: ConstraintValidationFunction<number> = function(
  constraintValue: number,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if (typeof value === 'number' || typeof value === 'string') {
    const numberValue = typeof value === 'string' ? +value : value;
    if (numberValue < constraintValue) {
      this.pushError(
        `'${key}' has to be at least ${constraintValue} but is ${numberValue}`
      );
    }
  } else {
    // this.pushError(`'${key}' is a type that cannot have a minimum value.`);
  }
};

// tslint:disable-next-line
const max: ConstraintValidationFunction<number> = function(
  constraintValue: number,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if (typeof value === 'number' || typeof value === 'string') {
    const numberValue = typeof value === 'string' ? +value : value;
    if (numberValue > constraintValue) {
      this.pushError(
        `'${key}' has to be lower than or equal to ${constraintValue} but is ${numberValue}`
      );
    }
  } else {
    // this.pushError(`'${key}' is a type that cannot have a maximum value.`);
  }
};

// tslint:disable-next-line
const equals: ConstraintValidationFunction<any> = function(
  constraintValue: any,
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if (value !== constraintValue) {
    this.pushError(
      `'${key}' has to be equal to '${JSON.stringify(
        constraintValue,
        undefined,
        2
      )}' but is '${JSON.stringify(value, undefined, 2)}'`
    );
  }
};

// tslint:disable-next-line
const matches: ConstraintValidationFunction<
  string | RegExp | string[]
> = function(
  constraintValue: string | RegExp | string[],
  validationPair: KeyValuePair
) {
  const { value, key } = validationPair;
  if (typeof value === 'string' || typeof value === 'number') {
    const stringValue = typeof value === 'number' ? String(value) : value;
    if (
      typeof constraintValue === 'string' ||
      constraintValue instanceof RegExp
    ) {
      const regexp: RegExp =
        typeof constraintValue === 'string'
          ? new RegExp(constraintValue)
          : constraintValue;
      if (!regexp.test(stringValue)) {
        this.pushError(
          `'${key}' has to match regexp '${regexp.source}' but is '${stringValue}'`
        );
      }
    } else if (
      Array.isArray(constraintValue) &&
      !constraintValue.includes(stringValue)
    ) {
      let allowedValuesString = '';
      constraintValue.forEach((val: string, index: number) => {
        allowedValuesString += `'${val}'${index !==
          constraintValue.length - 1} ? ', ' : ''`;
      });
      this.pushError(
        `'${key}' has to be one of the following values ${allowedValuesString} but is '${stringValue}'`
      );
    }
  }
};

export const CONSTRAINT_VALIDATION_FUNCTION_MAP: ConstraintValidationFunctionMap = {
  required,
  validate,
  minLength,
  maxLength,
  type,
  isArray,
  min,
  max,
  equals,
  matches
};
