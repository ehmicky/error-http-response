import errorHttpResponse, { Options, HttpResponse } from 'error-http-response'
import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

const error = new Error('')
const httpResponse = errorHttpResponse(error)

expectError(errorHttpResponse())
expectAssignable<HttpResponse>(errorHttpResponse(true))

errorHttpResponse(error, {})
expectAssignable<Options>({})
errorHttpResponse(error, undefined)
expectNotAssignable<Options>(undefined)
expectError(errorHttpResponse(error, true))
expectNotAssignable<Options>(true)
expectError(errorHttpResponse(error, { unknown: true }))
expectNotAssignable<Options>({ unknown: true })

errorHttpResponse(error, { type: '' })
expectAssignable<Options>({ type: '' })
expectError(errorHttpResponse(error, { type: true }))
expectNotAssignable<Options>({ type: true })

errorHttpResponse(error, { status: 200 })
expectAssignable<Options>({ status: 200 })
expectError(errorHttpResponse(error, { status: true }))
expectNotAssignable<Options>({ status: true })

errorHttpResponse(error, { title: '' })
expectAssignable<Options>({ title: '' })
expectError(errorHttpResponse(error, { title: true }))
expectNotAssignable<Options>({ title: true })

errorHttpResponse(error, { detail: '' })
expectAssignable<Options>({ detail: '' })
expectError(errorHttpResponse(error, { detail: true }))
expectNotAssignable<Options>({ detail: true })

errorHttpResponse(error, { instance: '' })
expectAssignable<Options>({ instance: '' })
expectError(errorHttpResponse(error, { instance: true }))
expectNotAssignable<Options>({ instance: true })

errorHttpResponse(error, { stack: '' })
expectAssignable<Options>({ stack: '' })
expectError(errorHttpResponse(error, { stack: true }))
expectNotAssignable<Options>({ stack: true })

errorHttpResponse(error, { extra: {} })
expectAssignable<Options>({ extra: {} })
errorHttpResponse(error, { extra: { prop: true } })
expectAssignable<Options>({ extra: { prop: true } })
expectError(errorHttpResponse(error, { extra: true }))
expectNotAssignable<Options>({ extra: true })

expectAssignable<HttpResponse>(httpResponse)
expectType<string | undefined>(httpResponse.type)
expectType<number | undefined>(httpResponse.status)
expectType<string>(httpResponse.title)
expectType<string>(httpResponse.detail)
expectType<string | undefined>(httpResponse.instance)
expectType<string>(httpResponse.stack)
expectType<object | undefined>(httpResponse.extra)
expectError(httpResponse.extra?.prop)

expectType<''>(errorHttpResponse(error, { type: '' as const }).type)
expectType<200>(errorHttpResponse(error, { status: 200 as const }).status)
expectType<''>(errorHttpResponse(error, { title: '' as const }).title)
expectType<''>(errorHttpResponse(error, { detail: '' as const }).detail)
expectType<''>(errorHttpResponse(error, { instance: '' as const }).instance)
expectType<''>(errorHttpResponse(error, { stack: '' as const }).stack)
expectType<true>(
  errorHttpResponse(error, { extra: { prop: true } as const }).extra.prop,
)
