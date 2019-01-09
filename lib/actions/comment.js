const { Action } = require('./action')
const populateTemplate = require('./handlebars/populateTemplate')

const createComment = async (context, number, body) => {
  console.log(number, body)
  return context.github.issues.createComment(
    context.repo({ number, body })
  )
}

class Comment extends Action {
  constructor () {
    super()
    this.supportedEvents = [
      'pull_request.*',
      'issues.*',
      'schedule.repository'
    ]
  }

  // there is nothing to do
  async beforeValidate () {}

  async afterValidate (context, settings, results) {
    let scheduleResults = results.validationSuites && results.validationSuites[0].schedule
    let commentables = (scheduleResults)
      ? scheduleResults.issues.concat(scheduleResults.pulls)
      : [this.getPayload(context)]

    return Promise.all(
      commentables.map(issue => {
        createComment(
          context,
          issue.number,
          populateTemplate(settings.payload.body, results)
        )
      })
    )
  }
}

module.exports = Comment
