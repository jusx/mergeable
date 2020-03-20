const { Validator } = require('./validator')
const andOrValidatorProcessor = require('./lib/andOrValidatorProcessor')

class Or extends Validator {
  constructor () {
    super()
    this.supportedEvents = [
      '*'
    ]
    this.supportedOptions = [
      'validate'
    ]
  }

  async validate (context, validationSettings, registry) {
    return andOrValidatorProcessor(context, validationSettings.validate, registry, 'Or')
  }
}

module.exports = Or