/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as HTTP from "http";
import {Neon} from "@element-ts/neon";

export class PdResponse {

	private readonly _res: HTTP.IncomingMessage;
	private readonly _data: any;
	private readonly _logger: Neon;
	private readonly _time: number;

	/**
	 * Do not use this, a response is generated automatically.
	 * @param res A response object.
	 * @param data The data associated with the response.
	 * @param logger A neon logger instance.
	 * @param time The round trip time.
	 */
	public constructor(res: HTTP.IncomingMessage, data: any, logger: Neon, time: number) {

		this._res = res;
		this._data = data;
		this._logger = logger;
		this._time = time;
		this._logger.log(`Received response in ${time} ms.`);
		this._logger.log(`Status code: ${res.statusCode}.`);
		this._logger.log(res.headers);
		this._logger.log(data);

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
	 * The amount of time in milliseconds it took the request to complete.
	 */
	public time(): number {
		return this._time;
	}

	/**
	 * Get the data from the response, it will be undefined if the data does not follow the type provided.
	 * First it will try and convert the data into an object.
	 *
	 * This uses @element-ts/oxygen, view the readme for more information on oxygen:
	 * https://github.com/element-ts/oxygen/
	 *
	 */
	public json(): object | undefined {

		const data = this._data;
		if (data === undefined) return undefined;
		if (!Buffer.isBuffer(data)) return undefined;
		const dataAsString = (data as Buffer).toString("utf8");
		return JSON.parse(dataAsString);

	}

}

