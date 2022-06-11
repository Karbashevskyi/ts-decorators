import {Is} from 'ts-checkers';
import {EachArgument} from '../../lib/decorators/each-argument.decorator';


export class Model {

    /**
     *
     * @param arg
     */
    @EachArgument(Is.Not.Null)
    // @ts-ignore
    testSayHello(...arg: any) {
        return arg;
    }

}
