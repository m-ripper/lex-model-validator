import {
  BaseError,
  InputModel,
  IntentValidator,
  Log,
  MetaDataValidator,
  ResourceValidator,
  SlotTypeValidator,
  Validator,
  ValidatorConstructor
} from './';

export const runValidation = (json: InputModel, validator: Validator) => {
  validator.run(json);
  if (validator.childrenCount > 0) {
    validator.runChildren(json);
  }
};

export class LexModelValidator {
  collectedErrors: BaseError[];
  private readonly $validators: Validator[];

  constructor(
    validatorConstructors: ValidatorConstructor[] = [
      MetaDataValidator,
      ResourceValidator,
      IntentValidator,
      SlotTypeValidator
    ]
  ) {
    this.collectedErrors = [];
    this.$validators = [];

    this.use(...validatorConstructors);
  }

  use(...validatorConstructors: ValidatorConstructor[]) {
    this.addValidators(...validatorConstructors);
  }

  validator<T extends Validator = any>(name: string): T | undefined {
    return this.$validators.find((validator: Validator) => {
      return validator.name === name;
    }) as T | undefined;
  }

  validateJson(json: InputModel): BaseError[] {
    return this.validate(json);
  }

  private validate(json: InputModel): BaseError[] {
    this.collectedErrors = [];

    this.$validators.forEach(runValidation.bind(this, json));

    let output = '';
    this.collectedErrors.forEach((error: BaseError) => {
      output += error.message + '\n';
    });

    if (output === '') {
      Log.success(
        'The given model should have no errors and there should be no problems while importing in Amazon Lex.'
      );
    } else {
      Log.warning(output);
    }
    return this.collectedErrors;
  }

  private addValidator(validatorConstructor: ValidatorConstructor) {
    if (
      !this.$validators.some((validator: Validator) => {
        return validator.name === validatorConstructor.name;
      })
    ) {
      this.$validators.push(new validatorConstructor(this));
    }
  }

  private addValidators(...validatorConstructors: ValidatorConstructor[]) {
    validatorConstructors.forEach((constructor: ValidatorConstructor) => {
      this.addValidator(constructor);
    });
  }
}
