import {
  Constraints,
  LexModelValidator,
  VALIDATION_FUNCTION_STATEMENT_MESSAGES,
  Validator
} from '../..';

export class ResourceValidator extends Validator {
  constructor(
    protected readonly $master: LexModelValidator,
    protected readonly $parent?: Validator
  ) {
    super($master, $parent);
  }

  getConstraints(): Constraints {
    return {
      resource: {
        type: 'object'
      },
      'resource.name': {
        type: 'string',
        minLength: 2
      },
      'resource.version': {
        type: 'string',
        minLength: 1
      },
      'resource.locale': {
        type: 'string',
        minLength: 2
      },
      'resource.childDirected': {
        type: 'boolean'
      },
      'resource.idleSessionTTLInSeconds': {
        type: 'number',
        min: 0
      },
      'resource.clarificationPrompt': {
        type: 'object'
      },
      'resource.clarificationPrompt.messages': {
        isArray: true,
        minLength: 1,
        validate: VALIDATION_FUNCTION_STATEMENT_MESSAGES
      },
      'resource.clarificationPrompt.maxAttempts': {
        type: 'number',
        min: 1
      },
      'resource.abortStatement': {
        type: 'object'
      },
      'resource.abortStatement.messages': {
        isArray: true,
        minLength: 1,
        validate: VALIDATION_FUNCTION_STATEMENT_MESSAGES
      }
    };
  }
}
