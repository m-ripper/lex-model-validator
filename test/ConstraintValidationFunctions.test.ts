import {Constraint, CONSTRAINT_VALIDATION_FUNCTION_MAP, KeyValuePair, LexModelValidator, ValidationFunction, Validator} from '../src';

class TestValidator extends Validator {
    getConstraints(): Record<string, Constraint> {
        return {};
    }

}

describe('test constraint validation functions', () => {

    const constraintValidationFunctionMap = CONSTRAINT_VALIDATION_FUNCTION_MAP;
    const validator = new LexModelValidator([TestValidator]);
    const testValidator = validator.validator<TestValidator>('TestValidator')!;

    const expectNoErrors = () => {
        expect(validator.collectedErrors).toHaveLength(0);
    };

    const expectErrors = (amount?: number) => {
        if (amount) {
            expect(validator.collectedErrors).toHaveLength(amount);
        } else {
            expect(validator.collectedErrors).not.toHaveLength(0);
        }
    };

    const fooBarPair: KeyValuePair<string> = {
        key: 'foo',
        value: 'bar',
    };

    beforeEach(() => {
        validator.collectedErrors = [];
    });

    describe('test required', () => {
        const {required} = constraintValidationFunctionMap;

        test('test required enabled succeeds', () => {
            required.call(testValidator, true, fooBarPair);
            expectNoErrors();
        });

        test('test required enabled fails', () => {
            required.call(testValidator, true, {key: 'foo', value: undefined});
            expectErrors(1);
        });

        test('test required disabled undefined succeeds', () => {
            required.call(testValidator, false, {key: 'foo', value: undefined});
            expectNoErrors();
        });
    });

    describe('test validate', () => {
        const {validate} = constraintValidationFunctionMap;
        // tslint:disable-next-line
        const validationFunction: ValidationFunction<string> = function (validationPair: KeyValuePair) {
            if (validationPair.value !== 'bar') {
                this.pushError(`test error`);
            }
        };

        test('test validate succeeds', () => {
            validate.call(testValidator, validationFunction, fooBarPair);
            expectNoErrors();
        });

        test('test validate fails', () => {
            validate.call(testValidator, validationFunction, {key: 'foo', value: undefined});
            expectErrors(1);
        });

    });

    describe('test minLength', () => {
        const {minLength} = constraintValidationFunctionMap;

        test('test minLength succeeds', () => {
            minLength.call(testValidator, 1, fooBarPair);
            expectNoErrors();
        });

        test('test minLength fails', () => {
            minLength.call(testValidator, 4, fooBarPair);
            expectErrors(1);
        });
    });

    describe('test maxLength', () => {
        const {maxLength} = constraintValidationFunctionMap;

        test('test maxLength succeeds', () => {
            maxLength.call(testValidator, 10, fooBarPair);
            expectNoErrors();
        });

        test('test maxLength fails', () => {
            maxLength.call(testValidator, 2, fooBarPair);
            expectErrors(1);
        });
    });

    describe('test type', () => {
        const {type} = constraintValidationFunctionMap;

        test('test maxLength succeeds', () => {
            type.call(testValidator, 'string', fooBarPair);
            expectNoErrors();

        });

        test('test maxLength fails', () => {
            type.call(testValidator, 'number', fooBarPair);
            expectErrors(1);
        });
    });

    describe('test isArray', () => {
        const {isArray} = constraintValidationFunctionMap;

        test('test isArray succeeds', () => {
            isArray.call(testValidator, true, {key: 'foo', value: ['bar']});
            expectNoErrors();
        });

        test('test isArray fails', () => {
            isArray.call(testValidator, true, fooBarPair);
            expectErrors(1);
        });
    });

    describe('test min', () => {
        const {min} = constraintValidationFunctionMap;

        test('test min succeeds', () => {
            min.call(testValidator, 3, {key: 'foo', value: 10});
            expectNoErrors();
        });

        test('test min fails', () => {
            min.call(testValidator, 3, {key: 'foo', value: 2});
            expectErrors(1);
        });
    });

    describe('test max', () => {
        const {max} = constraintValidationFunctionMap;

        test('test max succeeds', () => {
            max.call(testValidator, 10, {key: 'foo', value: 10});
            expectNoErrors();
        });

        test('test max fails', () => {
            max.call(testValidator, 10, {key: 'foo', value: 11});
            expectErrors(1);
        });
    });

    describe('test equals', () => {
        const {equals} = constraintValidationFunctionMap;

        test('test equals succeeds', () => {
            equals.call(testValidator, 'bar', fooBarPair);
            expectNoErrors();
        });

        test('test equals fails', () => {
            equals.call(testValidator, 'foo', fooBarPair);
            expectErrors(1);
        });
    });

    describe('test matches', () => {
        const {matches} = constraintValidationFunctionMap;

        test('test matches regexp succeeds', () => {
            matches.call(testValidator, RegExp('bar', 'g'), fooBarPair);
            expectNoErrors();
        });

        test('test matches regexp fails', () => {
            matches.call(testValidator, RegExp('foo', 'g'), fooBarPair);
            expectErrors(1);
        });

        test('test matches array succeeds', () => {
            matches.call(testValidator, ['abc', 'bar'], fooBarPair);
            expectNoErrors();
        });

        test('test matches array fails', () => {
            matches.call(testValidator, ['abc', 'foo'], fooBarPair);
            expectErrors(1);
        });
    });
});
