'use strict'

const neostandard = require('neostandard')

module.exports = [
  ...neostandard({ ts: true }),
  ...neostandard.plugins['typescript-eslint'].configs.recommended
]
