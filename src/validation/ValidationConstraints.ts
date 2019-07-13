import { Constraints } from '..';
import {
  VALIDATION_FUNCTION_CHECK_DUPLICATES,
  VALIDATION_FUNCTION_STATEMENT_MESSAGES
} from './ValidationFunctions';

export const VALIDATION_CONSTRAINTS_SLOT: Constraints = {
  name: {
    type: 'string',
    minLength: 2
  },
  priority: {
    type: 'number',
    min: 0
  },
  slotType: {
    type: 'string',
    minLength: 2
  },
  slotTypeVersion: {
    required: false,
    type: 'string',
    minLength: 1
  },
  slotConstraint: {
    matches: ['Required', 'Optional']
  },
  sampleUtterances: {
    isArray: true,
    validate: VALIDATION_FUNCTION_CHECK_DUPLICATES
  },
  valueElicitationPrompt: {
    type: 'object'
  },
  'valueElicitationPrompt.messages': {
    isArray: true,
    minLength: 1,
    validate: VALIDATION_FUNCTION_STATEMENT_MESSAGES
  },
  'valueElicitationPrompt.maxAttempts': {
    type: 'number',
    min: 1
  }
};

export const VALIDATION_CONSTRAINTS_INTENT: Constraints = {
  name: {
    type: 'string',
    minLength: 2
  },
  version: {
    type: 'string',
    minLength: 1
  },
  fulfillmentActivity: {
    type: 'object'
  },
  'fulfillmentActivity.type': {
    type: 'string',
    minLength: 1
  },
  sampleUtterances: {
    isArray: true,
    minLength: 0,
    validate: VALIDATION_FUNCTION_CHECK_DUPLICATES
  },
  slots: {
    isArray: true
  }
};

export const VALIDATION_CONSTRAINTS_SLOT_TYPE: Constraints = {
  name: {
    type: 'string',
    minLength: 2
  },
  version: {
    type: 'string',
    minLength: 1
  },
  enumerationValues: {
    isArray: true
  },
  valueSelectionStrategy: {
    type: 'string',
    minLength: 1
  }
};

export const VALIDATION_CONSTRAINTS_ENUMERATION_VALUE: Constraints = {
  value: {
    type: 'string',
    minLength: 1
  },
  synonyms: {
    isArray: true,
    validate: VALIDATION_FUNCTION_CHECK_DUPLICATES
  }
};

export const VALIDATION_CONSTRAINTS_STATEMENT_MESSAGE: Constraints = {
  contentType: {
    type: 'string',
    minLength: 2
  },
  content: {
    type: 'string',
    minLength: 1
  }
};
