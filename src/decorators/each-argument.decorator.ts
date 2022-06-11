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
    methods: Function | Function[],
    config?: IConfig
): ArgumentsIsNotNullOrUndefinedReturnedType => {

    const configuration: IConfigRequired = {
        typeOfError: TypeOfErrorEnum.THROW,
        ...config,
    };

    return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {

        const originalMethod: any = descriptor.value;

        descriptor.value = function (...args: any[]) {

            let methodList: Function[] = methods as Function[];
            let lastIndex: number = 0;

            let result = args?.every((argument: any, index: number) => {

                lastIndex = index;

                let method: Function = methods as Function;

                if (Is.Array(methods)) {

                    let foundMethod: Function | Function[] = methodList[index] ?? methodList[methodList?.length - 1];

                    if (Is.Array(foundMethod)) {

                        return (foundMethod as any).every((fun: any) => {

                            return fun(argument);

                        });

                    }

                    method = foundMethod;

                }

                return method(argument);

            });

            if (result) {

                return originalMethod.apply(this, args);

            }

            createErrorMessage(`Bad value for argument, index of argument "${lastIndex}" in ${String(propertyKey)}.`, configuration.typeOfError);

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
