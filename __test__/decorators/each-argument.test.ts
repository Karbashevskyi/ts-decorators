import {Model} from '../../mock/models/model';

describe('Decorator: @EachArgument', () => {

    let testClass: Model;

    // const arrWithDataToTest: any[] = [null, undefined, 'null', 'undefined', 'test'];

    beforeAll(() => {
        testClass = new Model();
    });

    it('testSayHello should true for "World"', () => {
        expect(testClass.testOne('World')).toStrictEqual(['World']);
    });

    it('testSayHello should false for null', () => {
        expect(() => {
            // @ts-ignore
            testClass.testOne(null)
        }).toThrow('Bad value for argument, index of argument "0" in testOne.');
    });

    it('testTwo', () => {
        expect(testClass.testTwo('World', 0)).toStrictEqual(['World', 0]);
    });

});
