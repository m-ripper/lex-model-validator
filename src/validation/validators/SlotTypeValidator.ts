import {
  Constraints,
  KeyValuePair,
  SlotType,
  ValidationFunction,
  Validator
} from '../..';

export class SlotTypeValidator extends Validator {
  getConstraints(): Constraints {
    return {
      'resource.slotTypes': {
        isArray: true,
        validate: this.validateSlotTypes
      }
    };
  }

  validateSlotTypes: ValidationFunction = (validationPair: KeyValuePair) => {
    const slotTypes = validationPair.value as SlotType[] | undefined;
    if (slotTypes && slotTypes.length > 0) {
      // const collectedEnumValues: string[] = [];
      // slotTypes.forEach((slotType: SlotType) => {
      //     this.validate(slotType, VALIDATION_CONSTRAINTS_SLOT_TYPE);
      //
      //     if (slotType.enumerationValues && slotType.enumerationValues.length > 0) {
      //         slotType.enumerationValues.forEach((value: SlotEnumerationValue) => {
      //             this.validate(value, VALIDATION_CONSTRAINTS_ENUMERATION_VALUE);
      //             if (collectedEnumValues.includes(value.value)) {
      //                 this.pushError(`value '${value.value}' in array '${validationPair.key + '.enumerationValues'}' is supposed to have unique values but it does not`);
      //             } else {
      //                 collectedEnumValues.push(value.value);
      //             }
      //         });
      //     }
      // });
    }
  };
}
