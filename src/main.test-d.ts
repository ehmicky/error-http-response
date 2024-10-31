import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import errorHttpResponse, {
  type HttpResponse,
  type Options,
} from 'error-http-response'

const error = new Error('')
const httpResponse = errorHttpResponse(error)

// @ts-expect-error
errorHttpResponse()
expectAssignable<HttpResponse>(errorHttpResponse(true))

errorHttpResponse(error, {})
expectAssignable<Options>({})
errorHttpResponse(error, undefined)
expectNotAssignable<Options>(undefined)
// @ts-expect-error
errorHttpResponse(error, true)
expectNotAssignable<Options>(true)
// @ts-expect-error
errorHttpResponse(error, { unknown: true })
expectNotAssignable<Options>({ unknown: true })

errorHttpResponse(error, { type: '' })
expectAssignable<Options>({ type: '' })
// @ts-expect-error
errorHttpResponse(error, { type: true })
expectNotAssignable<Options>({ type: true })

errorHttpResponse(error, { status: 200 })
expectAssignable<Options>({ status: 200 })
// @ts-expect-error
errorHttpResponse(error, { status: true })
expectNotAssignable<Options>({ status: true })

errorHttpResponse(error, { title: '' })
expectAssignable<Options>({ title: '' })
// @ts-expect-error
errorHttpResponse(error, { title: true })
expectNotAssignable<Options>({ title: true })

errorHttpResponse(error, { detail: '' })
expectAssignable<Options>({ detail: '' })
// @ts-expect-error
errorHttpResponse(error, { detail: true })
expectNotAssignable<Options>({ detail: true })

errorHttpResponse(error, { instance: '' })
expectAssignable<Options>({ instance: '' })
// @ts-expect-error
errorHttpResponse(error, { instance: true })
expectNotAssignable<Options>({ instance: true })

errorHttpResponse(error, { stack: '' })
expectAssignable<Options>({ stack: '' })
// @ts-expect-error
errorHttpResponse(error, { stack: true })
expectNotAssignable<Options>({ stack: true })

errorHttpResponse(error, { extra: {} })
expectAssignable<Options>({ extra: {} })
errorHttpResponse(error, { extra: { prop: true } })
expectAssignable<Options>({ extra: { prop: true } })
// @ts-expect-error
errorHttpResponse(error, { extra: true })
expectNotAssignable<Options>({ extra: true })

expectAssignable<HttpResponse>(httpResponse)
expectType<string | undefined>(httpResponse.type)
expectType<number | undefined>(httpResponse.status)
expectType<string>(httpResponse.title)
expectType<string>(httpResponse.detail)
expectType<string | undefined>(httpResponse.instance)
expectType<string>(httpResponse.stack)
expectType<object | undefined>(httpResponse.extra)
// @ts-expect-error
httpResponse.extra?.prop
