import {Is} from 'ts-checkers';
import {EachArgument} from '../../lib/decorators/each-argument.decorator';


export class Model {

    @EachArgument(Is.Not.Null)
    // @ts-ignore
    testOne(arg: any) {
        return [arg];
    }

    @EachArgument([Is.String, Is.Number])
    // @ts-ignore
    testTwo(argString: string, argNumber: number) {
        return [argString, argNumber];
    }

    @EachArgument([[Is.Not.Null, Is.Not.Undefined]])
    // @ts-ignore
    testThree(argAny: any) {
        return [argAny];
    }

}
