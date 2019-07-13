import get from 'lodash.get';
import {
  BaseError,
  Constraint,
  CONSTRAINT_VALIDATION_FUNCTION_MAP,
  Constraints,
  InputModel,
  KeyValuePair,
  LexModelValidator,
  runValidation,
  ValidatorConstructor,
  ValidatorInterface
} from '..';

export abstract class Validator implements ValidatorInterface {
  protected readonly $children: Validator[];

  constructor(
    protected readonly $master: LexModelValidator,
    protected readonly $parent?: Validator
  ) {
    this.$children = [];
  }

  get name(): string {
    return this.constructor.name;
  }

  get childrenCount(): number {
    return this.$children.length;
  }

  use(...validatorConstructors: ValidatorConstructor[]) {
    validatorConstructors.forEach((constructor: ValidatorConstructor) => {
      if (
        !this.$children.some((validator: Validator) => {
          return validator.name === constructor.name;
        })
      ) {
        this.$children.push(new constructor(this.$master, this.$parent));
      }
    });
  }

  abstract getConstraints(): Constraints;

  run(data: InputModel) {
    this.validate(data, this.getConstraints());
  }

  runChildren(data: InputModel) {
    this.$children.forEach(runValidation.bind(this, data));
  }

  pushError(error: string | BaseError) {
    if (typeof error === 'string') {
      this.$master.collectedErrors.push(new BaseError(error));
    } else {
      this.$master.collectedErrors.push(error);
    }
  }

  validate(data: InputModel, constraints: Constraints, prefix?: string) {
    const pathsToObjectsToBeValidated = Object.keys(constraints);
    for (const path of pathsToObjectsToBeValidated) {
      const constraint: Constraint = constraints[path];
      if (typeof constraint.required === 'undefined') {
        constraint.required = true;
      }
      const objectToBeValidated = get(data, path);
      const constraintProps = this.getSortedConstraintProperties(constraint);
      for (const constraintProp of constraintProps) {
        this.callValidation(
          {
            key: constraintProp,
            value: constraint[constraintProp as keyof Constraint]
          },
          {
            key: prefix ? `${prefix}.${path}` : path,
            value: objectToBeValidated
          }
        );
      }
    }
  }

  private getSortedConstraintProperties(constraint: Constraint): string[] {
    return Object.keys(constraint).sort((a: string, b: string) => {
      if (a === 'required') {
        return -1;
      } else if (b === 'required') {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private callValidation(
    constraintPair: KeyValuePair,
    validationPair: KeyValuePair
  ) {
    CONSTRAINT_VALIDATION_FUNCTION_MAP[
      constraintPair.key as keyof Constraint
    ].call(this, constraintPair.value!, validationPair);
  }
}
