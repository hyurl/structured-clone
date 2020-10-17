/**
 * Composes the data into a well-formated object that can be serialized via
 * JSON or HTML Structured Clone Algorithm.
 * @param forHTML For HTML Structured Clone Algorithm, by default it's for JSON.
 */
export declare function compose(data: any, forHTML?: boolean): any;

/**
 * Decomposes the formated data back to its original form.
 */
export declare function decompose(data: any): any;

/**
 * Serializes the data into a JSON string by using the structured clone
 * algorithm.
 */
export declare function serialize(data: any): string;

/**
 * Deserializes the JSON string back to its original data by using the
 * structured clone algorithm.
 */
export declare function deserialize(json: string): any;

export declare function createComposer(
    make: (type: string, value: any) => any
): (data: any, forHTML?: boolean) => any;

export declare function createDecomposer(
    parse: (data: any) => { type: string, value: any; },
    checkSignature: (data: any) => boolean
): (data: any) => any;

/**
 * @alias compose
 * @deprecated
 */
export declare function clone(data: any, forHTML?: boolean): any;

/**
 * @alias decompose
 * @deprecated
 */
export declare function declone(data: any): any;

export declare namespace utils {
    declare function error2object(err: Error): Error & object;
    declare function object2error(obj: Error & object): Error;
    declare function walkToJSON(data: any): any;
}
