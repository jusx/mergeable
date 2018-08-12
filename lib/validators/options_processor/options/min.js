const contructOutput = require('./lib/constructOutput')
const constructError = require('./lib/constructErrorOutput')

const COUNT_NOT_FOUND_ERROR = `Failed to run the test because 'count' is not provided for 'min' option. Please check README for more information about configuration`
const UNKNOWN_INPUT_TYPE_ERROR = `Input type invalid, expected string as input`

module.exports = (validatorContext, input, rule) => {
  const filter = rule.min

  let count = filter['count'] ? filter['count'] : filter
  let description = filter['description']
  if (!count) {
    return constructError(validatorContext, input, filter, COUNT_NOT_FOUND_ERROR)
  }

  let isMergeable

  const DEFAULT_SUCCESS_MESSAGE = `${validatorContext} does have a minimum of '${count}'`
  if (!description) description = `${validatorContext} count is less than "${count}"`

  if (typeof input === 'string') {
    isMergeable = !(input.length < count)
  } else {
    return constructError(validatorContext, input, filter, UNKNOWN_INPUT_TYPE_ERROR)
  }

  return contructOutput(validatorContext, input, rule, {
    status: isMergeable ? 'pass' : 'fail',
    description: isMergeable ? DEFAULT_SUCCESS_MESSAGE : description
  })
}