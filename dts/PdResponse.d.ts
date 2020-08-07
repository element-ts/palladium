/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
/// <reference types="node" />
import * as HTTP from "http";
import { Neon } from "@element-ts/neon";
export declare class PdResponse {
    private readonly _res;
    private readonly _data;
    private readonly _logger;
    private readonly _time;
    /**
     * Do not use this, a response is generated automatically.
     * @param res A response object.
     * @param data The data associated with the response.
     * @param logger A neon logger instance.
     * @param time The round trip time.
     */
    constructor(res: HTTP.IncomingMessage, data: any, logger: Neon, time: number);
    /**
     * Get the status of the response.
     */
    status(): number;
    /**
     * Get the response headers.
     */
    headers(): HTTP.IncomingHttpHeaders;
    /**
     * Get the raw data provided by the response.
     */
    rawPayload(): any;
    /**
     * The amount of time in milliseconds it took the request to complete.
     */
    time(): number;
    /**
     * Get the data from the response, it will be undefined if the data does not follow the type provided.
     * First it will try and convert the data into an object.
     *
     * This uses @element-ts/oxygen, view the readme for more information on oxygen:
     * https://github.com/element-ts/oxygen/
     *
     */
    json(): object | undefined;
}
