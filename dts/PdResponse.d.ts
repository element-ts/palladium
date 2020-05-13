/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */
/// <reference types="node" />
import * as HTTP from "http";
import { OObjectTypeDefinition, OType } from "@element-ts/oxygen";
export declare class PdResponse {
    private readonly _res;
    private readonly _data;
    /**
     * Do not use this, a response is generated automatically.
     * @param res A response object.
     * @param data The data associated with the response.
     */
    constructor(res: HTTP.IncomingMessage, data: any);
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
     * Get the data from the response, it will be undefined if the data does not follow the type provided.
     *
     * This uses @element-ts/oxygen, view the readme for more information on oxygen:
     * https://github.com/element-ts/oxygen/
     *
     * @param type An OType.
     */
    payload<T>(type: OType): T | undefined;
    /**
     * Get the data from the response, it will be undefined if the data does not follow the type provided.
     * First it will try and convert the data into an object.
     *
     * This uses @element-ts/oxygen, view the readme for more information on oxygen:
     * https://github.com/element-ts/oxygen/
     *
     * @param type A type definition for an OObjectType.
     */
    json<T>(type: OObjectTypeDefinition): T | undefined;
}
