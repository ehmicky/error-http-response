[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/error-http-response)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://unpkg.com/error-http-response?module)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/error-http-response)
[![Minified size](https://img.shields.io/bundlephobia/minzip/error-http-response?label&colorA=404040&colorB=808080&logo=webpack)](https://bundlephobia.com/package/error-http-response)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Create HTTP error responses.

This converts errors to plain objects
([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807), "problem details") to use
in an HTTP response.

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7018596298127781890/)
if you're looking for a Node.js API or CLI engineer (10 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions in
either US or EU time zones.

# Example

The main HTTP response fields are automatically set using
[`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name),
[`error.message`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message)
[`error.stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)
and other error properties.

```js
const error = new AuthError('Could not authenticate.')
error.userId = 62
const object = errorHttpResponse(error)
// {
//   title: 'AuthError',
//   detail: 'Could not authenticate.',
//   stack: `AuthError: Could not authenticate.
//     at ...`,
//   extra: { userId: 62 }
// }
```

Additional fields can be explicitly set in the error class's constructor, using
`this.http`.

<!-- eslint-disable fp/no-class, fp/no-this, fp/no-mutation -->

```js
class AuthError extends Error {
  constructor(...args) {
    super(...args)
    this.http = {
      type: 'https://example.com/probs/auth',
      status: 401,
    }
  }
}
```

Or on the error instance, using `error.http`.

<!-- eslint-disable fp/no-mutating-assign -->

```js
const error = new AuthError('Could not authenticate.')
Object.assign(error.http, {
  instance: '/users/62',
  extra: { userId: 62 },
})
```

Or as an argument.

```js
import errorHttpResponse from 'error-http-response'

const object = errorHttpResponse(error, {
  extra: { isHttp: true },
})
// {
//   type: 'https://example.com/probs/auth',
//   status: 401,
//   title: 'AuthError',
//   detail: 'Could not authenticate.',
//   instance: '/users/62',
//   stack: `AuthError: Could not authenticate.
//     at ...`,
//   extra: { isHttp: true, userId: 62 },
// }
```

# Install

```bash
npm install error-http-response
```

This package works in both Node.js >=14.18.0 and
[browsers](https://raw.githubusercontent.com/ehmicky/dev-tasks/main/src/browserslist).

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# API

## errorHttpResponse(error, options?)

`value` `Error | any`\
`options` [`Options?`](#options)\
_Return value_: `HttpResponse`

Converts `error` to a plain object
([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807), "problem details") to use
in an HTTP response.

`error` should be an `Error` instance, but invalid errors are automatically
[normalized](https://github.com/ehmicky/normalize-exception).

## Options

_Type_: `object`

The options and the return value have the same shape
([RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)). Options can be passed
either as an argument to
[`errorHttpResponse()`](#errorhttpresponseerror-options) or be set to
`error.http`.

Options are validated: an exception is thrown if their syntax is invalid.

### type

_Type_: `urlString`\
_Default_: `undefined`

URI identifying and documenting the error class. Ideally, each error class
should set one.

### status

_Type_: `integer`\
_Default_: `undefined`

HTTP status code.

### title

_Type_: `string`\
_Default_: `error.name`

Error class name.

### detail

_Type_: `string`\
_Default_: `error.message`

Error description.

### instance

_Type_: `urlString`\
_Default_: `undefined`

URI identifying the value which errored.

### stack

_Type_: `string`\
_Default_: `error.stack`

Error stack trace. Can be set to an empty string.

### extra

_Type_: `object`\
_Default_: any additional `error` properties

Additional information. This is always
[safe to serialize as JSON](https://github.com/ehmicky/safe-json-value). Can be
set to an empty object.

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors in
  a simple, stable, consistent way
- [`modern-errors-http`](https://github.com/ehmicky/modern-errors-http):
  `modern-errors` plugin to create HTTP error responses
- [`error-custom-class`](https://github.com/ehmicky/error-custom-class): Create
  one error class
- [`error-class-utils`](https://github.com/ehmicky/error-class-utils): Utilities
  to properly create error classes
- [`error-serializer`](https://github.com/ehmicky/error-serializer): Convert
  errors to/from plain objects
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`is-error-instance`](https://github.com/ehmicky/is-error-instance): Check if
  a value is an `Error` instance
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`set-error-class`](https://github.com/ehmicky/set-error-class): Properly
  update an error's class
- [`set-error-message`](https://github.com/ehmicky/set-error-message): Properly
  update an error's message
- [`wrap-error-message`](https://github.com/ehmicky/wrap-error-message):
  Properly wrap an error's message
- [`set-error-props`](https://github.com/ehmicky/set-error-props): Properly
  update an error's properties
- [`set-error-stack`](https://github.com/ehmicky/set-error-stack): Properly
  update an error's stack
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`
- [`handle-cli-error`](https://github.com/ehmicky/handle-cli-error): 💣 Error
  handler for CLI applications 💥
- [`safe-json-value`](https://github.com/ehmicky/safe-json-value): ⛑️ JSON
  serialization should never fail
- [`log-process-errors`](https://github.com/ehmicky/log-process-errors): Show
  some ❤ to Node.js process errors
- [`error-http-response`](https://github.com/ehmicky/error-http-response):
  Create HTTP error responses
- [`winston-error-format`](https://github.com/ehmicky/winston-error-format): Log
  errors with Winston

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/error-http-response/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/error-http-response/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
