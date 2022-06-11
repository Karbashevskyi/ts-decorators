"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EachArgument = exports.TypeOfErrorEnum = void 0;
const ts_checkers_1 = require("ts-checkers");
var TypeOfErrorEnum;
(function (TypeOfErrorEnum) {
    TypeOfErrorEnum[TypeOfErrorEnum["IGNORE"] = 0] = "IGNORE";
    TypeOfErrorEnum[TypeOfErrorEnum["THROW"] = 1] = "THROW";
    TypeOfErrorEnum[TypeOfErrorEnum["CONSOLE"] = 2] = "CONSOLE";
    TypeOfErrorEnum[TypeOfErrorEnum["CONSOLE_ERROR"] = 3] = "CONSOLE_ERROR";
})(TypeOfErrorEnum = exports.TypeOfErrorEnum || (exports.TypeOfErrorEnum = {}));
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
const EachArgument = (methods, config) => {
    const configuration = Object.assign({ typeOfError: TypeOfErrorEnum.THROW }, config);
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let methodList = methods;
            let lastIndex = 0;
            let result = args === null || args === void 0 ? void 0 : args.every((argument, index) => {
                var _a;
                lastIndex = index;
                let method = methods;
                if (ts_checkers_1.Is.Array(methods)) {
                    let foundMethod = (_a = methodList[index]) !== null && _a !== void 0 ? _a : methodList[(methodList === null || methodList === void 0 ? void 0 : methodList.length) - 1];
                    if (ts_checkers_1.Is.Array(foundMethod)) {
                        return foundMethod.every((fun) => {
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
exports.EachArgument = EachArgument;
/**
 *
 * @param message is string, write you custom message
 * @param typeOfError choice your method showing of error
 */
function createErrorMessage(message = 'Error', typeOfError) {
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
