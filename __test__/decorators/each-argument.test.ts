import {Model} from '../../mock/models/model';

describe('Decorator: @EachArgument', () => {

    let testClass: Model;

    // const arrWithDataToTest: any[] = [null, undefined, 'null', 'undefined', 'test'];

    beforeAll(() => {
        testClass = new Model();
    });

    it('testSayHello should true for "World"', () => {
        expect(testClass.testSayHello('World')).toStrictEqual(['World']);
    });

    it('testSayHello should false for null', () => {
        expect(() => {
            // @ts-ignore
            testClass.testSayHello(null)
        }).toThrow('Bad value for argument, index of argument "0" in testSayHello.');
    });

});
