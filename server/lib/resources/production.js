
const config = require('config')
const axios = require('axios')
const moment = require('moment')

const host = config.get('fusion.host')

exports.loaders = () => {
  const fns = [ 'daily', 'lifetime' ]
  const memos = {}

  fns.forEach((name) => {
    memos[name] = (() => {
      const cache = {}
      return (accountNumber, startDate, endDate) => {
        let key = `${accountNumber}:${startDate}:${endDate}`
        if (!cache[key]) cache[key] = this[name](accountNumber, startDate, endDate)
        return cache[key]
      }
    })()
  })
  return memos
}

exports.daily = (accountNumber, startDate, endDate) => {
  let query = []

  if (startDate) {
    startDate = moment(startDate).format('YYYY-MM-DD')
    query.push(`startDate=${startDate}`)
  }

  if (endDate) {
    endDate = moment(endDate).format('YYYY-MM-DD')
    query.push(`endDate=${endDate}`)
  }

  let url = `${host}/system/${accountNumber}/energy/daily`

  if (query.length) {
    url += `?${query.join('&')}`
  }

  return axios
    .get(url)
    .then(({ data }) => {
      const startDate = moment(data.startDate).utc().format()
      const measurements = data.production.reverse().map((value, idx) => {
        const date = moment(data.cached).subtract(idx, 'days').utc().format()
        return {
          unit: 'W',
          value,
          created: date,
        }
      })
      return {
        step: 'daily',
        startDate,
        measurements,
        total: data.total,
      }
    })
}

exports.lifetime = (accountNumber) => {
  const url = `${host}/system/${accountNumber}/summary?force=true`
  return axios
    .get(url)
    .then(({ data }) => {
      const startDate = moment(data.commissioned).utc().format()

      return {
        step: 'lifetime',
        startDate,
        measurements: [],
        total: data.energyLifetime,
      }
    })
}
