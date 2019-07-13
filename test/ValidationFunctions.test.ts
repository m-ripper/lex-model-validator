import {BaseError, Constraint, LexModelValidator, VALIDATION_FUNCTION_CHECK_DUPLICATES, VALIDATION_FUNCTION_STATEMENT_MESSAGES, Validator} from '../src';

class TestStatementMessagesValidator extends Validator {
    getConstraints(): Record<string, Constraint> {
        return {
            messages: {
                validate: VALIDATION_FUNCTION_STATEMENT_MESSAGES,
            },
        };
    }
}

// tslint:disable-next-line
class TestCheckDoublesValidator extends Validator {
    getConstraints(): Record<string, Constraint> {
        return {
            stringValues: {
                validate: VALIDATION_FUNCTION_CHECK_DUPLICATES,
            },
        };
    }
}

describe('test validation functions', () => {

    describe('test statementMessage', () => {

        const validator = new LexModelValidator([TestStatementMessagesValidator]);

        test('test statementMessages succeeds', () => {
            const json = {
                messages: [
                    {contentType: 'test', content: 'testing'},
                ],
            };
            expect<BaseError[]>(validator.validateJson(json)).toHaveLength(0);
        });

        test('test statementMessages fails', () => {
            const json = {
                messages: [
                    {contentType: '', content: 'testing'},
                    {},
                    {contentType: 'dasdas', content: ''},
                ],
            };
            expect<BaseError[]>(validator.validateJson(json)).not.toHaveLength(0);
        });
    });

    describe('test checkDuplicates', () => {

        const validator = new LexModelValidator([TestCheckDoublesValidator]);

        test('test checkDuplicates succeeds', () => {
            const json = {
                stringValues: [
                    'hello',
                    'test',
                    'should work',
                ],
            };
            expect<BaseError[]>(validator.validateJson(json)).toHaveLength(0);
        });

        test('test checkDuplicates fails', () => {
            const json = {
                stringValues: [
                    'hello',
                    'test',
                    'should',
                    'not work',
                    'hello',
                ],
            };
            expect<BaseError[]>(validator.validateJson(json)).not.toHaveLength(0);
        });
    });
});
