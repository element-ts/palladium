# palladium
A type-safe http/s request library.

## Import
Import what you need. You will most likely not need to import all of these.
```typescript
import {
    PdRequest,
    PdResponse,
    PdMethod
} from "element-ts/palladium";
```

## Example
#### Creating a Request
```typescript
const req: PdRequest = new PdRequest();
req.setMethod(PdMethod.Post);
req.setUrl("my-api-address");
req.setBody({
    name: "Elijah Cobb"
})
req.setBearerToken("my-cool-token");
```

#### Fetching Response
```typescript
const res: PdResponse = await req.request();
const code: number = res.statusCode;
const body: object | undefined = res.getJSON()
```

## Documentation
You can view the
[declaration files](https://github.com/element-ts/palladium/tree/master/dts) or even the
[source code](https://github.com/element-ts/palladium/tree/master/ts) on GitHub.

## Bugs
If you find any bugs please [create an issue on GitHub](https://github.com/element-ts/palladium/issues) or if you are
old-fashioned email me at [elijah@elijahcobb.com](mailto:elijah@elijahcobb.com).