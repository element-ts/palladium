import {PdRequest} from "../PdRequest";
import {PdMethod} from "../PdMethod";
import {PdResponse} from "../PdResponse";
import {OArrayType, OObjectType, OStandardType} from "@element-ts/oxygen";

test("test", async (): Promise<void> => {

	PdRequest.enableLogging();

	const req: PdRequest = new PdRequest();

	req.setUrl("https://jsonplaceholder.typicode.com/users");
	req.setMethod(PdMethod.Get);

	const res: PdResponse = await req.request();

	expect(res.statusCode).toBe(200);
	expect(res.body).toBeDefined();
	expect(res.roundTripTime).toBeDefined();
	expect(res.roundTripTime).toBeGreaterThan(0);
	expect(res.getTypeCheckedValue<any>(OArrayType.any(OObjectType.follow({
		id: OStandardType.number,
		name: OStandardType.string,
		username: OStandardType.string,
		email: OStandardType.string,
		address: OObjectType.follow({
			street: OStandardType.string,
			suite: OStandardType.string,
			city: OStandardType.string,
			zipcode: OStandardType.string,
			geo: OObjectType.follow({
				lat: OStandardType.string,
				lng: OStandardType.string
			})
		}),
		phone: OStandardType.string,
		website: OStandardType.string,
		company: OObjectType.follow({
			name: OStandardType.string,
			catchPhrase: OStandardType.string,
			bs: OStandardType.string
		})
	})))).toBeDefined();

});