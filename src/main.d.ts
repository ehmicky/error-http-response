/**
 * The options and the return value have the same shape
 * ([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)). Options can be passed
 * either as an argument to
 * [`errorHttpResponse()`](#errorhttpresponseerror-options) or be set to
 * `error.http`.
 *
 * Options are validated: an exception is thrown if their syntax is invalid.
 */
export interface Options {
  /**
   * URI identifying and documenting the error class.
   * Ideally, each error class should set one.
   *
   * @default undefined
   */
  readonly type?: string

  /**
   * HTTP status code.
   *
   * @default undefined
   */
  readonly status?: number

  /**
   * Error class name.
   *
   * @default error.name
   */
  readonly title?: string

  /**
   * Error description.
   *
   * @default error.message
   */
  readonly detail?: string

  /**
   * URI identifying the value which errored.
   *
   * @default undefined
   */
  readonly instance?: string

  /**
   * Error stack trace. Can be set to an empty string.
   *
   * @default error.stack
   */
  readonly stack?: string

  /**
   * Additional information. This is always
   * [safe to serialize as JSON](https://github.com/ehmicky/safe-json-value).
   * Can be set to an empty object.
   *
   * @default any additional `error` properties
   */
  readonly extra?: object
}

/**
 * `errorHttpResponse()`'s return value
 */
export interface HttpResponse extends Options {
  readonly title: string
  readonly detail: string
  readonly stack: string
}

/**
 * Converts `error` to a plain object
 * ([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807), "problem details") to
 * use in an HTTP response.
 *
 * `error` should be an `Error` instance, but invalid errors are automatically
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * const error = new AuthError('Could not authenticate.')
 * error.userId = 62
 * const object = errorHttpResponse(error)
 * // {
 * //   title: 'AuthError',
 * //   detail: 'Could not authenticate.',
 * //   stack: `AuthError: Could not authenticate.
 * //     at ...`,
 * //   extra: { userId: 62 }
 * // }
 * ```
 */
export default function errorHttpResponse(
  error: unknown,
  options?: Options,
): HttpResponse
