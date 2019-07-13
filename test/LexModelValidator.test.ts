import * as workingExample from '../json/working_example.json';
import {BaseError, LexModelValidator} from '../src';

const validator = new LexModelValidator();
describe('test LexModelValidator', () => {
    test('test validateJson succeeds', () => {
        expect<BaseError[]>(validator.validateJson(workingExample)).toHaveLength(0);
    });

    test('test validateJson fails', () => {
        expect<BaseError[]>(validator.validateJson({})).not.toHaveLength(0);
    });
});
