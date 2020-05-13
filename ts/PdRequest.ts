/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import * as HTTPS from "https";
import * as HTTP from "http";
import {URL} from "url";
import {PdResponse} from "./PdResponse";
import {PdMethod} from "./PdMethod";
import {Neon} from "@element-ts/neon";

export class PdRequest {

	private readonly _headers: HTTP.OutgoingHttpHeaders;
	private readonly _method: PdMethod;
	private _url: string | undefined;
	private _body: any;
	private _logger: Neon;

	private constructor(method: PdMethod) {

		this._method = method;
		this._logger = new Neon();
		this._headers = {};

	}

	private setInternalHeaders(): void {

		this._headers["user-agent"] = "@element-ts/palladium";

	}

	private encodeBody(): Buffer | undefined {

		if (this._body === undefined) return undefined;

		let returnValue: Buffer | undefined;

		if (Buffer.isBuffer(this._body)) returnValue = this._body;
		if (typeof this._body === "string") returnValue = Buffer.from(this._body);
		if (typeof this._body === "number") returnValue = Buffer.from(this._body + "");
		if (typeof this._body === "boolean") returnValue = Buffer.from(this._body ? "true" : "false");
		if (typeof this._body === "object") returnValue = Buffer.from(JSON.stringify(this._body));

		if (returnValue !== undefined) {
			this._headers["content-length"] = returnValue.length;
			this._headers["content-type"] = "application/json";
		}

		return returnValue;

	}

	/**
	 * Set the url for the request.
	 * @param value The url.
	 */
	public url(value: string): PdRequest {
		this._url = value;
		return this;
	}

	/**
	 * Set the body of the request.
	 * @param value The body.
	 */
	public body(value: any): PdRequest {
		this._body = value;
		return this;
	}

	/**
	 * Set a bearer token in the authorization header. Bearer will automatically be added.
	 * @param value A token.
	 */
	public token(value: string): PdRequest {
		this._headers["authorization"] = "Bearer " + value;
		return this;
	}

	/**
	 * Enable debug mode.
	 */
	public debug(): PdRequest {
		this._logger.setTitle("@element-ts/palladium");
		this._logger.enable();
		return this;
	}

	/**
	 * Set a header for the request.
	 * @param key The header.
	 * @param value The value for the header.
	 */
	public header(key: string, value: number | string): PdRequest {
		this._headers[key] = value;
		return this;
	}

	/**
	 * Call the request async and get a PdResponse object back.
	 */
	public request(): Promise<PdResponse> {
		return new Promise<PdResponse>((resolve, reject) => {

			const startTime = Date.now();
			this._logger.log(`Creating new request.`);

			if (this._url === undefined) throw new Error("URL is undefined.");

			this.setInternalHeaders();
			this._logger.log("Set internal headers.");
			const body = this.encodeBody();
			this._logger.log("Encoded body.");
			const url = new URL(this._url);
			const config: HTTP.RequestOptions = {
				hostname: url.hostname,
				port: url.port,
				path: url.pathname,
				method: this._method.toUpperCase(),
				headers: this._headers,
			};

			this._logger.log("Will make request:");
			this._logger.log(config);

			const handler = (res: HTTP.IncomingMessage): void => {
				this._logger.log("Response instance created.");
				res.on("error", reject);
				res.on("data", data => {
					this._logger.log("Received data.");
					resolve(new PdResponse(res, data, this._logger, Date.now() - startTime));
				});
			};

			let request: HTTP.ClientRequest;
			if (this._url.includes("http")) {
				this._logger.log("Will create http request.");
				request = HTTP.request(config, handler);
			} else if (this._url.includes("https")) {
				this._logger.log("Will create https request.");
				request = HTTPS.request(config, handler);
			} else {
				this._logger.err("Request was neither http or https.");
				throw new Error("URL was not http or https.");
			}

			request.on("error", reject);

			if (body !== undefined) request.write(body);
			request.end();

		});
	}

	/**
	 * Create a get request instance.
	 */
	public static get(): PdRequest {
		return new PdRequest(PdMethod.get);
	}

	/**
	 * Create a post request instance.
	 */
	public static post(): PdRequest {
		return new PdRequest(PdMethod.post);
	}

	/**
	 * Create a put request instance.
	 */
	public static put(): PdRequest {
		return new PdRequest(PdMethod.put);
	}

	/**
	 * Create a delete request instance.
	 */
	public static delete(): PdRequest {
		return new PdRequest(PdMethod.delete);
	}

	/**
	 * Create a new request instance.
	 * @param method A type of method.
	 */
	public static init(method: PdMethod): PdRequest {
		return new PdRequest(method);
	}
}
