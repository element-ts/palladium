/**
 *
 * Elijah Cobb
 * elijah@elijahcobb.com
 * https://elijahcobb.com
 *
 *
 * Copyright 2019 Elijah Cobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import * as RequestLib from "request";
import { PdMethod } from "./PdMethod";
import { PdResponse } from "./PdResponse";
import * as HTTP from "http";

export class PdRequest {

	public body: Buffer | undefined;
	public url: string | undefined;
	public method: PdMethod | undefined;
	public headers: HTTP.OutgoingHttpHeaders | undefined;

	public constructor() {

		this.setBody = this.setBody.bind(this);
		this.requestAsync = this.requestAsync.bind(this);
		this.request = this.request.bind(this);
		this.headers = {};

	}

	public setBearerToken(token: string): void {

		if (this.headers === undefined) this.headers = {};
		this.headers["Authorization"] = "Bearer " + token;

	}

	public setUrl(url: string): void {

		this.url = url;

	}

	public setMethod(method: PdMethod): void {

		this.method = method;

	}

	public setBody(body: string | object | Buffer): void {

		const type: string = typeof body;

		if (type === "object") {

			if (body instanceof Buffer) {

				this.body = body;

			} else {

				try {

					this.body = Buffer.from(JSON.stringify(body), "utf8");
					if (this.headers === undefined) this.headers = {};
					this.headers["Content-Type"] = "application/json";

				} catch (e) {

					throw new Error("Failed to parse object to buffer.");

				}

			}

		} else if (type === "string") {

			try {

				this.body = Buffer.from(body as string, "utf8");

			} catch (e) {

				throw new Error("Failed to parse string to buffer.");

			}

		} else {

			throw new Error("Body must be a Buffer, object, or string.");

		}

	}

	public requestAsync(completion: (error: Error | undefined, response: PdResponse | undefined) => void): void {

		if (!this.method) throw new Error("You must supply a HTTP method for the request.");
		if (!this.url) throw new Error("You must supply a URL for the request.");

		const req: { method: string, uri: string, body?: Buffer, headers?: HTTP.OutgoingHttpHeaders} = {
			method: this.method,
			uri: this.url
		};

		if (this.body) req["body"] = this.body;
		if (this.headers) req["headers"] = this.headers;

		const startTime: number = Date.now();

		RequestLib(req as any, (error: any, response: RequestLib.Response): void => {

				if (error) {

					if (typeof error === "object" && error instanceof Error) completion(error, undefined);
					else completion(new Error(error), undefined);

				} else {

					completion(undefined, new PdResponse(response, startTime));

				}

			}
		);

	}

	public request(): Promise<PdResponse> {

		return new Promise<PdResponse>(((resolve: (value: PdResponse) => void, reject: (reason?: any) => void): void => {

			this.requestAsync(((error: Error | undefined, response: PdResponse | undefined): void => {

				if (error || response === undefined) reject(error);
				else resolve(response);

			}));

		}));

	}
}