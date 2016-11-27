
const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const axios = require('axios')
const config = require('config')
const moment = require('moment')

const Address = require('./Address').default
const Contact = require('./Contact').default
const Measurement = require('./Measurement').default
const Progress = require('./Progress').default
const Weather = require('./Weather').default

const employeeResource = require('../../lib/resources/employee')

const weatherHost = config.get('weather.host')
const weatherKey = config.get('weather.apiKey')
const weatherText = require('../../lib/utils').weatherText


const weatherUrls = {
  1: '/currentconditions/v1',
  5: '/forecasts/v1/daily/5day',
}

const weatherParsers = {
  1: (data) => {
    return data.map((datum) => {
      const subset = {
        cloudCover: datum.CloudCover,
        day: datum.IsDayTime,
        date: moment(datum.LocalObservationDateTime).utc().format(),
        temperature: datum.Temperature.Imperial.Value,
        uvIndex: datum.UVIndex,
        visibility: datum.Visibility.Imperial.Value,
        weatherIcon: datum.WeatherIcon,
        weatherText: weatherText[datum.WeatherIcon],
      }
      return subset
    })
  },
  5: (data) => {
    // console.log(JSON.stringify(data, null, 2))
    return data.DailyForecasts.map((datum) => {
      const uvIndex = datum.AirAndPollen.filter((item) => {
        return item.Name === 'UVIndex'
      })[0].Value

      const subset = {
        // temperature: data.
        cloudCover: datum.Day.CloudCover,
        day: true,
        date: moment(datum.Date).utc().format(),
        temperature: datum.Temperature.Maximum.Value,
        uvIndex,
        weatherIcon: datum.Day.Icon,
        weatherText: weatherText[datum.Day.Icon],
      }

      return subset
    })
  },
}

const System = new GraphQLObjectType({
  name: 'SolarSystem',
  description: 'Solar Panel System',
  fields: () => ({
    weather: {
      type: new GraphQLList(Weather),
      args: {
        days: { type: GraphQLInt },
      },
      resolve: (source, { days = 1 }) => {
        if (days <= 1) days = 1
        if (days > 1) days = 5
        // fetch from weather service
        const url = `${weatherHost}/${weatherUrls[days]}/2197569?apikey=${weatherKey}&details=true`

        return axios
          .get(url)
          .then(({ data }) => weatherParsers[days](data))
      },
    },
    salesRep: {
      type: new GraphQLNonNull(Contact),
      resolve: (source) => employeeResource.findById(source._source.sales_mgr.emp_id),
    },
    address: {
      type: new GraphQLNonNull(Address),
      resolve: (source) => source._source.address,
    },
    progress: {
      type: new GraphQLList(Progress),
      resolve: (source) => {
        const dates = source._source.date
        return Object.keys(dates).map((name) => {
          return {
            title: name,
            data: dates[name],
          }
        })
      },
    },
    production: {
      args: {
        startDate: { type: GraphQLString },
        step: { type: GraphQLString },
      },
      type: Measurement,
      resolve: (source, args, context) => {
        const accountNumber = source._source.account_no
        const {
          step = 'daily',
          startDate,
        } = args

        const productionResource = context.loaders.production
        const fn = productionResource[step]

        if (!fn) throw new Error(`Step "${step}" not implemented`)

        return fn(accountNumber, startDate)
      },
    },
    consumption: {
      args: {
        startDate: { type: GraphQLString },
        step: { type: GraphQLString },
      },
      type: Measurement,
      resolve: (source, args, context) => {
        const accountNumber = source._source.account_no
        const {
          step = 'daily',
          startDate,
        } = args

        const productionResource = context.loaders.production

        if (!productionResource[step]) throw new Error(`Step "${step}" not implemented`)

        return productionResource[step](accountNumber, startDate)
          .then((data) => {
            console.error('Consumption isn\'t real. This will just be up to 7x of production')
            const multiplier = Math.random() * 7 + 1

            data.measurements.forEach((measurement) => {
              measurement.value = Math.floor(measurement.value * multiplier)
            })
            return data
          })
      },
    },
  }),
})


exports.default = System
