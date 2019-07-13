import { LexModelValidator, ValidationFunction, Validator } from '../index';

export interface KeyValuePair<T = {}> {
  key: string;
  value?: any;
}

export type InputModel = Record<string, any>;

export type ValidatorConstructor = new (
  $master: LexModelValidator,
  $parent?: Validator
) => Validator;

export interface ValidatorInterface {
  run(data: InputModel): void;

  runChildren(data: InputModel): void;
}

export type Constraints = Record<string, Constraint>;
export type AllowedType =
  | 'object'
  | 'string'
  | 'boolean'
  | 'undefined'
  | 'function'
  | 'number'
  | 'symbol';

export interface Constraint {
  required?: boolean;
  validate?: ValidationFunction;
  minLength?: number;
  maxLength?: number;
  type?: AllowedType;
  isArray?: boolean;
  min?: number;
  max?: number;
  equals?: any;
  matches?: string | RegExp | string[];
}

export interface LexModel {
  metadata: MetaData;
  resource: Resource;
}

export interface MetaData {
  schemaVersion: string;
  importType: 'LEX';
  importFormat: 'JSON';
}

export interface Resource {
  name: string;
  version: string;
  locale: string;

  childDirected: boolean;
  idleSessionTTLInSeconds: number;

  clarificationPrompt: Prompt;
  abortStatement: Statement;

  intents: Intent[];
  slotTypes: SlotType[];
}

export interface Intent {
  name: string;
  version: string;
  fulfillmentActivity: {
    type: string;
  };
  sampleUtterances: string[];
  slots: Slot[];
}

export type SlotConstraint = 'Required' | 'Optional';

export interface Slot {
  name: string;
  priority: number;
  slotType: string;
  slotTypeVersion?: string;
  slotConstraint: SlotConstraint;
  sampleUtterances: string[];
  valueElicitationPrompt: Prompt;
}

export interface SlotType {
  name: string;
  version: string;
  enumerationValues: SlotEnumerationValue[];
  valueSelectionStrategy: ValueSelectionStrategy;
}

export type ValueSelectionStrategy = string;

export interface SlotEnumerationValue {
  value: string;
  synonyms: string[];
}

export interface Statement {
  messages: Message[];
}

export interface Prompt extends Statement {
  maxAttempts: number;
}

export interface Message {
  contentType: string;
  content: string;
}
