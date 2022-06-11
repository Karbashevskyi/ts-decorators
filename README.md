# ts-decorators
![NPM Latest Version](https://img.shields.io/npm/v/ts-decorators)
![Downloads Count](https://img.shields.io/npm/dm/ts-decorators.svg)
![Bundle Size](https://packagephobia.now.sh/badge?p=ts-decorators)
![Test Status](https://img.shields.io/travis/karbashevskyi/ts-decorators/main.svg)
![Last Update Date](https://img.shields.io/github/last-commit/karbashevskyi/ts-decorators)
![Project License](https://img.shields.io/github/license/karbashevskyi/ts-decorators)


## Installation

```bash
$ npm install ts-decorators
```

## Import
```typescript
import {EachArgument} from "ts-decorators";
```


## Examples:
```typescript

// How to use it?
// Easy!

class SomeClass {
    
    @EachArgument(Is.Number)
    public someMethod(argument: number) {
        // In this case, decorator will use Is.Number method for check argument.
    }
    
}

class SomeClass {
    
    @EachArgument([Is.Number, Is.String])
    public someMethod(argument: number, seacondArgument: string) {
        // In this case, decorator will use Is.Number method for check argument and Is.String for seacondArgument.
    }
    
}

class SomeClass {
    
    @EachArgument([Is.Number, [Is.String, Is.Boolean]])
    public someMethod(argument: number, seacondArgument: string | boolean) {
        // In this case, decorator will use Is.Number method for check argument and [Is.String, Is.Boolean] for seacondArgument.
    }
    
}

class SomeClass {
    
    @EachArgument(Is.Not.Null)
    public someMethod(argument: number, seacondArgument: string | boolean) {
        // In this case, decorator will use Is.Not.Null method for check all arguments.
    }
    
}

class SomeClass {
    
    @EachArgument([Is.Number, Is.Not.Null])
    public someMethod(argument: number, seacondArgument: string | boolean, thirthArgument: Symbol) {
        // In this case, decorator will use Is.Number method for check argument and will use Is.Not.Null for check all other arguments (without the first one).
    }
    
}

// And if you want to check "empty data".

class SomeClass {
    
    @EachArgument([Is.Not.Null, Is.Not.NullOrUndefined])
    public someMethod(argument: number, seacondArgument: string | boolean) {
        // ...
    }
    
}

```


## My Social Network Links
[Twitter Profile](https://twitter.com/Karbashevskyi)

[LinkedIn Profile](https://www.linkedin.com/in/ivan-karbashevskyi/)

[GitHub Profile](https://github.com/Karbashevskyi)

[medium.com Profile](https://medium.com/@ivankarbashevskyi)

[Pateron Profile](https://www.patreon.com/karbash)
