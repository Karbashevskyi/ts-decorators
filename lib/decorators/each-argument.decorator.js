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
const EachArgument = (methods, config) => {
    const configuration = Object.assign({ typeOfError: TypeOfErrorEnum.THROW }, config);
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let result = true;
            // TODO interface
            const recursiveValidation = (method, argument, index) => {
                var _a;
                if (Array.isArray(method)) { // TODO change to Is.Array
                    method = (_a = method[index]) !== null && _a !== void 0 ? _a : method[(method === null || method === void 0 ? void 0 : method.length) - 1];
                    return recursiveValidation(method, argument, index);
                }
                return method(argument);
            };
            for (let index = 0; index < (args === null || args === void 0 ? void 0 : args.length); index++) {
                const argument = args[index];
                result = recursiveValidation(methods, argument, index);
                if (ts_checkers_1.Is.False(result)) {
                    createErrorMessage(`Bad value for argument, index of argument "${index}" in ${String(propertyKey)}.`, configuration.typeOfError);
                    break;
                }
            }
            if (ts_checkers_1.Is.True(result)) {
                return originalMethod.apply(this, args);
            }
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
