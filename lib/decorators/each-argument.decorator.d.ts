export declare enum TypeOfErrorEnum {
    IGNORE = 0,
    THROW = 1,
    CONSOLE = 2,
    CONSOLE_ERROR = 3
}
export interface IConfig {
    typeOfError?: TypeOfErrorEnum;
}
export declare type IConfigRequired = Required<IConfig>;
export declare type ArgumentsIsNotNullOrUndefinedReturnedType = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
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
export declare const EachArgument: (methods: Function | Function[] | Function[][], config?: IConfig | undefined) => ArgumentsIsNotNullOrUndefinedReturnedType;
