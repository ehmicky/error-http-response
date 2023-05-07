import test from 'ava'
import errorHttpResponse from 'error-http-response'
import { each } from 'test-each'


const error = new Error('test')

each(
  [
    ['title', 'testTitle'],
    ['detail', 'testDetails'],
    ['stack', 'testStack'],
    // eslint-disable-next-line no-magic-numbers
    ['status', 200],
    ...['type', 'instance'].flatMap((optName) => [
      [optName, ''],
      [optName, '#hash'],
      [optName, '/path'],
      [optName, 'https://example.com/path'],
    ]),
    ['extra', {}],
    ['extra', { prop: true }],
  ],
  ({ title }, [propName, propValue]) => {
    test(`Valid options are kept | ${title}`, (t) => {
      t.deepEqual(
        errorHttpResponse(error, { [propName]: propValue })[propName],
        propValue,
      )
    })
  },
)

each(
  [
    undefined,
    {},
    ...['title', 'detail', 'status', 'type', 'instance', 'stack', 'extra'].map(
      (optName) => ({ [optName]: undefined }),
    ),
  ],
  ({ title }, options) => {
    test(`Assign default options | ${title}`, (t) => {
      t.deepEqual(errorHttpResponse(error, options), {
        title: error.name,
        detail: error.message,
        stack: error.stack,
      })
    })
  },
)

test('Does not set undefined values', (t) => {
  t.deepEqual(Object.keys(errorHttpResponse(error)), [
    'title',
    'detail',
    'stack',
  ])
})

test('Normalizes the error', (t) => {
  t.is(errorHttpResponse('test').detail, 'test')
})

test('Assign default extra', (t) => {
  const propsError = new Error('test')
  // eslint-disable-next-line fp/no-mutation
  propsError.prop = true
  t.deepEqual(errorHttpResponse(propsError).extra, { prop: true })
})

test('Keep extra JSON-safe', (t) => {
  t.deepEqual(
    errorHttpResponse(error, { extra: { one: true, two: 0n } }).extra,
    { one: true },
  )
})

test('Keep object keys order', (t) => {
  t.deepEqual(
    Object.keys(
      errorHttpResponse(error, {
        extra: {},
        stack: '',
        instance: '',
        type: '',
        status: 200,
        title: '',
        detail: '',
      }),
    ),
    ['type', 'status', 'title', 'detail', 'instance', 'stack', 'extra'],
  )
})
