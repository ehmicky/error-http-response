import test from 'ava'
import errorHttpResponse from 'error-http-response'
import { each } from 'test-each'


const error = new Error('test')
error.http = { title: 'title' }

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

test('Can use error.http', (t) => {
  t.is(errorHttpResponse(error).title, 'title')
})

test('error.http has priority over options', (t) => {
  t.is(errorHttpResponse(error, { title: 'otherTitle' }).title, 'title')
})

test('Validates error.http', (t) => {
  const invalidError = new Error('test')
  // eslint-disable-next-line fp/no-mutation
  invalidError.http = true
  t.throws(errorHttpResponse.bind(undefined, invalidError))
})

test('error.http is not kept as extra', (t) => {
  t.false('extra' in errorHttpResponse(error))
})

test('error.extra empty is kept', (t) => {
  const emptyExtraError = new Error('test')
  // eslint-disable-next-line fp/no-mutation
  emptyExtraError.http = { extra: {} }
  t.deepEqual(errorHttpResponse(emptyExtraError).extra, {})
})

test('error.extra empty options is kept', (t) => {
  t.deepEqual(errorHttpResponse(error, { extra: {} }).extra, {})
})

test('error.extra are merged', (t) => {
  const extraError = new Error('test')
  // eslint-disable-next-line fp/no-mutation
  extraError.http = { extra: { one: true } }
  t.deepEqual(errorHttpResponse(extraError, { extra: { two: true } }).extra, {
    one: true,
    two: true,
  })
})
