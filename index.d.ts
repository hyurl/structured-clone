/**
 * Composes the data into a well-formatted object that can be serialized via
 * JSON or HTML Structured Clone Algorithm.
 * @param forHTML For HTML Structured Clone Algorithm, by default it's for JSON.
 */
export declare function compose(data: any, forHTML?: boolean): any;

/**
 * Decomposes the formatted data back to its original form.
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

export declare namespace utils {
    function error2object(err: Error): Error & object;
    function object2error(obj: Error & object): Error;
    function walkToJSON(data: any): any;
    function getGlobal(prop?: string | symbol): any;
}
