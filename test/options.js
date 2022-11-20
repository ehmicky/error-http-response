import test from 'ava'
import errorHttpResponse from 'error-http-response'
import { each } from 'test-each'

each(
  [
    true,
    { unknown: true },
    { title: true },
    { detail: true },
    { stack: true },
    { status: '200' },
    { status: 600 },
    ...['type', 'instance'].flatMap((optName) => [
      { [optName]: true },
      { [optName]: '//' },
    ]),
    { extra: true },
  ],
  ({ title }, options) => {
    test(`Options are validated | ${title}`, (t) => {
      t.throws(errorHttpResponse.bind(undefined, '', options))
    })
  },
)
