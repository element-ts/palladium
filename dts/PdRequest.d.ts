/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
import { PdResponse } from "./PdResponse";
import { PdMethod } from "./PdMethod";
export declare class PdRequest {
    private readonly _headers;
    private readonly _method;
    private _url;
    private _body;
    private _logger;
    private constructor();
    private setInternalHeaders;
    private encodeBody;
    /**
     * Set the url for the request.
     * @param value The url.
     */
    url(value: string): PdRequest;
    /**
     * Set the body of the request.
     * @param value The body.
     */
    body(value: any): PdRequest;
    /**
     * Set a bearer token in the authorization header. Bearer will automatically be added.
     * @param value A token.
     */
    token(value: string): PdRequest;
    /**
     * Enable debug mode.
     */
    debug(): PdRequest;
    /**
     * Set a header for the request.
     * @param key The header.
     * @param value The value for the header.
     */
    header(key: string, value: number | string): PdRequest;
    /**
     * Call the request async and get a PdResponse object back.
     */
    request(): Promise<PdResponse>;
    /**
     * Create a get request instance.
     */
    static get(): PdRequest;
    /**
     * Create a post request instance.
     */
    static post(): PdRequest;
    /**
     * Create a put request instance.
     */
    static put(): PdRequest;
    /**
     * Create a delete request instance.
     */
    static delete(): PdRequest;
    /**
     * Create a new request instance.
     * @param method A type of method.
     */
    static init(method: PdMethod): PdRequest;
}
