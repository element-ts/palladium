import {PdRequest} from "../PdRequest";
import {PdMethod} from "../PdMethod";
import {PdResponse} from "../PdResponse";

test("test", async (): Promise<void> => {

	const req: PdRequest = new PdRequest();

	req.setUrl("https://jsonplaceholder.typicode.com/users");
	req.setMethod(PdMethod.Get);

	const res: PdResponse = await req.request();

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.roundTripTime).toBeDefined();
	expect(res.roundTripTime).toBeGreaterThan(0);

});