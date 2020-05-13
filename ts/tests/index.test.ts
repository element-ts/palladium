import {PdRequest} from "../PdRequest";
import {PdMethod} from "../PdMethod";
import {PdResponse} from "../PdResponse";
import {OArrayType, OObjectType, OStandardType} from "@element-ts/oxygen";

test("test", async (): Promise<void> => {

	const res = await PdRequest
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

});