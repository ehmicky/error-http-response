import normalizeException from 'normalize-exception'
import safeJsonValue from 'safe-json-value'

import { getOptions } from './options.js'

// Turn `error` into a RFC 7807 problem details object.
// Object keys order is significant.
export default function errorHttpResponse(error, options) {
  // eslint-disable-next-line no-unused-vars
  const { name, message, stack, cause, errors, problemDetails, ...errorProps } =
    normalizeException(error)
  const optionsA = getOptions(problemDetails, options)
  return safeJsonValue({
    ...getOptionalProp(optionsA, 'type'),
    ...getOptionalProp(optionsA, 'status'),
    ...getDefaultedProp(optionsA, 'title', String(name)),
    ...getDefaultedProp(optionsA, 'detail', String(message)),
    ...getOptionalProp(optionsA, 'instance'),
    ...getDefaultedProp(optionsA, 'stack', String(stack)),
    ...getExtra(optionsA, errorProps),
  }).value
}

const getOptionalProp = function (options, optName) {
  return options[optName] === undefined ? {} : { [optName]: options[optName] }
}

const getDefaultedProp = function (options, optName, defaultValue) {
  return { [optName]: options[optName] ?? defaultValue }
}

const getExtra = function ({ extra }, errorProps) {
  if (extra !== undefined) {
    return { extra }
  }

  return Object.keys(errorProps).length === 0 ? {} : { extra: errorProps }
}
