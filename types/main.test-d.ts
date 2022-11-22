import errorHttpResponse, { Options } from 'error-http-response'
import { expectType, expectAssignable } from 'tsd'

expectType<object>(errorHttpResponse(true))

errorHttpResponse(true, {})
expectAssignable<Options>({})
