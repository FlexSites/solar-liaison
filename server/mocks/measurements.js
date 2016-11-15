
const casual = require('casual')
const moment = require('moment')

exports.single = (created) => {
  return {
    unit: 'kW',
    value: casual.double(0, 1000),
    created: created.format('YYYY-MM-DDTHH:mm:ssZ'),
  }
}


exports.default = (unit = 'days') => {
  const count = casual.integer(0, 100)

  const measurements = []
  for (let i = 0; i < count; i++) {
    measurements.unshift(this.single(moment().subtract(i, unit)))
  }

  return measurements
}
