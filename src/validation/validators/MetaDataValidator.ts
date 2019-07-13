import { Constraints, Validator } from '../..';

export class MetaDataValidator extends Validator {
  getConstraints(): Constraints {
    return {
      metadata: {
        type: 'object'
      },
      'metadata.schemaVersion': {
        minLength: 2,
        type: 'string'
      },
      'metadata.importType': {
        equals: 'LEX'
      },
      'metadata.importFormat': {
        equals: 'JSON'
      }
    };
  }
}
