import {Is} from 'ts-checkers';

export enum TypeOfErrorEnum {
    IGNORE,
    THROW,
    CONSOLE,
    CONSOLE_ERROR,
}

export interface IConfig {
    typeOfError?: TypeOfErrorEnum;
}

export type IConfigRequired = Required<IConfig>;

export type ArgumentsIsNotNullOrUndefinedReturnedType = (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) => PropertyDescriptor;

// TODO add check instanceOf

/**
 *
 * @param methods
 * @param config has interface IConfig
 *
 * Examples:
 * @EachArgument(Is.Not.Null)
 * @EachArgument([Is.Not.Null, Is.Not.String])
 * @EachArgument([Is.Not.NullOrUndefined, [Is.Not.String, Is.Not.Number]])
 */
export const EachArgument = (
    methods: Function | Function[] | Function[][],
    config?: IConfig
): ArgumentsIsNotNullOrUndefinedReturnedType => {

    const configuration: IConfigRequired = {
        typeOfError: TypeOfErrorEnum.THROW,
        ...config,
    };

    return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {

        const originalMethod: any = descriptor.value;

        descriptor.value = function (...args: any[]) {

            let result: boolean = true;

            // TODO interface
            const recursiveValidation = (method: typeof methods, argument: any, index: number): boolean => {
                if (Array.isArray(method)) { // TODO change to Is.Array
                    method = method[index] ?? method[method?.length - 1];
                    return recursiveValidation(method, argument, index);
                }
                return method(argument);
            };

            for (let index = 0; index < args?.length; index++) {

                const argument: any = args[index];
                result = recursiveValidation(methods, argument, index);

                if (Is.False(result)) {
                    createErrorMessage(`Bad value for argument, index of argument "${index}" in ${String(propertyKey)}.`, configuration.typeOfError);
                    break;
                }

            }

            if (Is.True(result)) {

                return originalMethod.apply(this, args);

            }

        };

        return descriptor;
    };
};

/**
 *
 * @param message is string, write you custom message
 * @param typeOfError choice your method showing of error
 */
function createErrorMessage(message: string = 'Error', typeOfError: TypeOfErrorEnum) {
    if (typeOfError) {
        switch (typeOfError) {
            case TypeOfErrorEnum.THROW:
                throw new Error(message);
            case TypeOfErrorEnum.CONSOLE:
                console.assert(false, message);
                break;
            case TypeOfErrorEnum.CONSOLE_ERROR:
                console.error(message);
                break;
        }
    }
}
