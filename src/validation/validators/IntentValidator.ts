import {
  Constraints,
  Intent,
  KeyValuePair,
  Slot,
  VALIDATION_CONSTRAINTS_INTENT,
  VALIDATION_CONSTRAINTS_SLOT,
  ValidationFunction,
  Validator
} from '../..';

export class IntentValidator extends Validator {
  getConstraints(): Constraints {
    return {
      'resource.intents': {
        isArray: true,
        validate: this.validateIntents
      }
    };
  }

  validateIntents: ValidationFunction<Intent[]> = (
    validationPair: KeyValuePair
  ) => {
    const intents = validationPair.value;
    if (intents && intents.length > 0) {
      intents.forEach((intent: Intent, intentIndex: number) => {
        this.validate(
          intent,
          VALIDATION_CONSTRAINTS_INTENT,
          validationPair.key + `[${intentIndex}]`
        );
        if (intent.slots && intent.slots.length > 0) {
          intent.slots.forEach((slot: Slot, slotIndex: number) => {
            this.validate(
              slot,
              VALIDATION_CONSTRAINTS_SLOT,
              validationPair.key + `[${intentIndex}].slots[${slotIndex}]`
            );
          });
        }
      });
    }
  };
}
