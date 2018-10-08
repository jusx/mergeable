module.exports = {
  CONFIGURATION_FILE_PATH: '.github/mergeable.yml',
  ERROR_INVALID_YML: 'Invalid mergeable YML file format. Root mergeable node is missing.',
  DEFAULT_PASS: [{
    do: 'checks',
    state: 'completed',
    status: 'success',
    payload: {
      title: 'Success! You are ready to Merge',
      summary: `All the validators have return 'pass'! \n Here are some stats of the run: \n {{validationCount}} validations were ran`
    }
  }],
  DEFAULT_FAIL: [{
    do: 'checks',
    state: 'completed',
    status: 'failure',
    payload: {
      title: 'Mergeable found some failed checks!',
      summary: `Some or All of the validators have returned 'fail' status, please check below for details
      Here are some stats of the run: \n {{validationCount}} validations were ran. \n {{passCount}} ***PASSED***
      {{failCount}} ***FAILED***`
    }
  }],
  DEFAULT_ERROR: [{
    do: 'checks',
    state: 'completed',
    status: 'action_required',
    payload: {
      title: 'Mergeable found some ERRORS!',
      summary: `Following Errors have been found, please fix them!!`
    }
  }],
  DEFAULT_VALIDATE: [{
    do: 'title',
    must_exclude: {
      regex: 'wip|dnm|exp|poc'
    }
  }, {
    do: 'label',
    must_exclude: {
      regex: 'work in progress|do not merge|experimental|proof of concept'
    }
  }, {
    do: 'description',
    no_empty: {
      enabled: true
    }
  }]
}
