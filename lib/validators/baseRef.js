const { Validator } = require('./validator')

class BaseRef extends Validator {
  constructor () {
    super('baseRef')
    this.supportedEvents = [
      'pull_request.opened',
      'pull_request.edited',
      'pull_request_review.submitted',
      'pull_request_review.edited',
      'pull_request_review.dismissed',
      'pull_request.labeled',
      'pull_request.milestoned',
      'pull_request.demilestoned',
      'pull_request.assigned',
      'pull_request.unassigned',
      'pull_request.unlabeled',
      'pull_request.synchronize',
      'pull_request.push_synchronize'
    ]
    this.supportedSettings = {
      must_include: {
        regex: 'string',
        regex_flag: 'string',
        message: 'string'
      },
      must_exclude: {
        regex: 'string',
        regex_flag: 'string',
        message: 'string'
      }
    }
  }

  async validate (context, validationSettings) {
    return this.processOptions(
      validationSettings,
      this.getPayload(context).base.ref
    )
  }
}

module.exports = BaseRef
