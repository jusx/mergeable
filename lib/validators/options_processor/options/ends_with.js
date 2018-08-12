const contructOutput = require('./lib/constructOutput')
const constructError = require('./lib/constructErrorOutput')

const MATCH_NOT_FOUND_ERROR = `Failed to run the test because 'match' is not provided for 'ends_with' option. Please check README for more information about configuration`
const UNKNOWN_INPUT_TYPE_ERROR = `Input type invalid, expected string as input`

module.exports = (validatorContext, input, rule) => {
  const filter = rule.ends_with

  const match = filter['match']
  let description = filter['description']
  if (!match) {
    return constructError(validatorContext, input, filter, MATCH_NOT_FOUND_ERROR)
  }

  let isMergeable = input.indexOf(match) === (input.length - match.length)

  const DEFAULT_SUCCESS_MESSAGE = `${validatorContext} does ends with '${match}'`
  if (!description) description = `${validatorContext} must ends with "${match}"`
  let regexObj

  try {
    regexObj = new RegExp(match, 'i')
  } catch (err) {
    return constructError(validatorContext, input, filter, `Failed to create a regex expression with the provided regex: ${match}`)
  }

  if (typeof input === 'string') {
    isMergeable = input.indexOf(match) === (input.length - match.length)
  } else {
    return constructError(validatorContext, input, filter, UNKNOWN_INPUT_TYPE_ERROR)
  }

  return contructOutput(validatorContext, input, rule, {
    status: isMergeable ? 'pass' : 'fail',
    description: isMergeable ? DEFAULT_SUCCESS_MESSAGE : description
  })
}