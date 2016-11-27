
const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const Temperature = new GraphQLObjectType({
  name: 'Temperature',

  fields: () => ({
    unit: { type: new GraphQLNonNull(GraphQLString) },
    value: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: (source) => {
        return Math.floor(source.value * 1000) / 1000
      },
    },
  }),
})

const Weather = new GraphQLObjectType({
  name: 'WeatherForecast',
  fields: () => ({
    temperature: {
      type: Temperature,
      args: {
        unit: { type: GraphQLString },
      },
      resolve: (source, { unit = 'Fahrenheit' }) => {
        unit = unit.toLowerCase()[0]
        const map = {
          f: 'Fahrenheit',
          c: 'Celsius',
          k: 'Kelvin',
        }
        const temps = {
          Fahrenheit: source.temperature,
          Celsius: (source.temperature - 32) * (5 / 9),
          Kelvin: (source.temperature + 459.67) * (5 / 9),
        }

        unit = map[unit] || map.f
        const value = temps[unit]

        return {
          unit,
          value,
        }
      },
    },
    cloudCover: { type: GraphQLInt },
    day: { type: GraphQLBoolean },
    date: { type: GraphQLString },
    uvIndex: { type: GraphQLInt },
    visibility: { type: GraphQLInt },
    weatherIcon: { type: GraphQLInt },
    weatherText: { type: GraphQLString },
  }),
})

exports.default = Weather
