const _ = require('lodash')
const consts = require('../lib/consts')

class V2Config {
  static transform (config) {
    let transformedConfig = _.cloneDeep(config)
    setPullRequestDefault(transformedConfig)
    return transformedConfig
  }
}

const setPullRequestDefault = (config) => {
  config.mergeable.forEach((recipe) => {
    if (recipe.pass === undefined) {
      recipe.pass = []
    }
    if (recipe.fail === undefined) {
      recipe.fail = []
    }
    if (recipe.error === undefined) {
      recipe.error = []
    }

    if (recipe.when.includes('pull_request')) {
      if (recipe.pass === undefined) {
        recipe.pass = consts.DEFAULT_PR_PASS
      }
      if (recipe.fail === undefined) {
        recipe.fail = consts.DEFAULT_PR_FAIL
      }
      if (recipe.error === undefined) {
        recipe.error = consts.DEFAULT_PR_ERROR
      }
    }
  })
}
module.exports = V2Config
