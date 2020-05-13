/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as HTTP from "http";
import {OObjectType, OObjectTypeDefinition, OType} from "@element-ts/oxygen";

export class PdResponse {

	private readonly _res: HTTP.IncomingMessage;
	private readonly _data: any;

	/**
	 * Do not use this, a response is generated automatically.
	 * @param res A response object.
	 * @param data The data associated with the response.
	 */
	public constructor(res: HTTP.IncomingMessage, data: any) {

		this._res = res;
		this._data = data;

	}

	/**
	 * Get the status of the response.
	 */
	public status(): number {

		const status = this._res.statusCode;
		if (status === undefined) throw new Error("Status code is undefined.");

		return status;

	}

	/**
	 * Get the response headers.
	 */
	public headers(): HTTP.IncomingHttpHeaders {

		return this._res.headers;

	}

	/**
	 * Get the raw data provided by the response.
	 */
	public rawPayload(): any {

		return this._data;

	}

	/**
	 * Get the data from the response, it will be undefined if the data does not follow the type provided.
	 *
	 * This uses @element-ts/oxygen, view the readme for more information on oxygen:
	 * https://github.com/element-ts/oxygen/
	 *
	 * @param type An OType.
	 */
	public payload<T>(type: OType): T | undefined {

		return type.verify(this._data);

	}

	/**
	 * Get the data from the response, it will be undefined if the data does not follow the type provided.
	 * First it will try and convert the data into an object.
	 *
	 * This uses @element-ts/oxygen, view the readme for more information on oxygen:
	 * https://github.com/element-ts/oxygen/
	 *
	 * @param type A type definition for an OObjectType.
	 */
	public json<T>(type: OObjectTypeDefinition): T | undefined {

		const data = this._data;
		if (data === undefined) return undefined;
		if (!Buffer.isBuffer(data)) return undefined;
		const dataAsString = (data as Buffer).toString("utf8");
		const obj: T = JSON.parse(dataAsString);

		return OObjectType.follow(type).verify(obj);

	}

}

