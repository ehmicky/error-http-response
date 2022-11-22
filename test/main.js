import test from 'ava'
import errorHttpResponse from 'error-http-response'

test('Dummy test', (t) => {
  t.true(errorHttpResponse(true))
})
