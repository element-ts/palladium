# palladium
A type-safe promise based http/s request library.

## Example
In the following example you create a PDRequest instance via the `post()` static method and then using builder methods
you can add the correct attributed to the request and then at the end call the async method `request()`. This will
return a `PdResponse` instance.

On the response instance there are helpful methods to handle type checking. Getting the headers, status code are
obvious. However, you can get the raw body or use the `json()` method. This required an `OObjectTypeDefinition` which
you can learn more about in [element-ts/oxygen](https://github.com/element-ts/oxygen). This will return undefined if
the response does not match the type definition provided, or return a generic defined value based on the type
definition.
```typescript
import {OStandardType} from "@element-ts/oxygen";
import {PdRequest, PdResponse} from "@element-ts/palladium";
const res: PdResponse = await PdRequest
    .post()
    .url("https://api.com/my-endpoint")
    .token("xxx")
    .body({
    	email: "elijah@elijahcobb.com",
    	password: "1234"
    })
    .request();

console.log(res.status());
console.log(res.headers());
console.log(res.json({
    token: OStandardType.string,
    timestamp: OStandardType.number
}));
```

## Documentation
You can view the
[declaration files](https://github.com/element-ts/palladium/tree/master/dts) or even the
[source code](https://github.com/element-ts/palladium/tree/master/ts) on GitHub.

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/element-ts/palladium/issues) or if you are
old-fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).