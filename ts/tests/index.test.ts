import {PdRequest} from "../PdRequest";
import {PdMethod} from "../PdMethod";
import {PdResponse} from "../PdResponse";

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

});
