/**
 * Constructs a clone of the object that can be serialized with JSON or HTML
 * Structured Clone Algorithm.
 * @param data
 * @param forHSCA For HTML Structured Clone Algorithm, by default it's
 *  for JSON.
 */
export declare function clone(data: any, forHSCA?: boolean): any;

/**
 * When constructing a clone for JSON, this function is used to destruct the
 * object to it's original form.
 * @param {any} data
 */
export declare function declone(data: any): any;