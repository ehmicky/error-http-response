import normalizeException from 'normalize-exception'
import safeJsonValue from 'safe-json-value'

import { getOptions } from './options.js'

// Turn `error` into a RFC 7807 problem details object.
// Object keys order is significant.
const errorHttpResponse = (error, options) => {
  // eslint-disable-next-line no-unused-vars
  const { name, message, stack, cause, errors, http, ...errorProps } =
    normalizeException(error)
  const optionsA = getOptions(http, options)
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

export default errorHttpResponse

const getOptionalProp = (options, optName) =>
  options[optName] === undefined ? {} : { [optName]: options[optName] }

const getDefaultedProp = (options, optName, defaultValue) => ({
  [optName]: options[optName] ?? defaultValue,
})

const getExtra = ({ extra }, errorProps) => {
  if (extra !== undefined) {
    return { extra }
  }

  return Object.keys(errorProps).length === 0 ? {} : { extra: errorProps }
}
