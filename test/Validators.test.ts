import * as workingExample from '../json/working_example.json';
import {BaseError, IntentValidator, LexModelValidator, MetaDataValidator, ResourceValidator, SlotTypeValidator} from '../src';

describe('test validators', () => {
    describe('test MetaDataValidator', () => {

        const validator = new LexModelValidator([MetaDataValidator]);

        test('test MetaDataValidator succeeds', () => {
            expect<BaseError[]>(validator.validateJson(workingExample)).toHaveLength(0);
        });

        test('test MetaDataValidator fails', () => {
            expect<BaseError[]>(validator.validateJson({})).not.toHaveLength(0);
        });
    });

    describe('test ResourceValidator', () => {

        const validator = new LexModelValidator([ResourceValidator]);

        test('test ResourceValidator succeeds', () => {
            expect<BaseError[]>(validator.validateJson(workingExample)).toHaveLength(0);
        });

        test('test ResourceValidator fails', () => {
            expect<BaseError[]>(validator.validateJson({})).not.toHaveLength(0);
        });
    });

    describe('test IntentValidator', () => {

        const validator = new LexModelValidator([IntentValidator]);

        test('test IntentValidator succeeds', () => {
            expect<BaseError[]>(validator.validateJson(workingExample)).toHaveLength(0);
        });

        test('test IntentValidator fails', () => {
            expect<BaseError[]>(validator.validateJson({})).not.toHaveLength(0);
        });
    });

    describe('test SlotTypeValidator', () => {

        const validator = new LexModelValidator([SlotTypeValidator]);

        test('test SlotTypeValidator succeeds', () => {
            expect<BaseError[]>(validator.validateJson(workingExample)).toHaveLength(0);
        });

        test('test SlotTypeValidator fails', () => {
            expect<BaseError[]>(validator.validateJson({})).not.toHaveLength(0);
        });
    });

});
