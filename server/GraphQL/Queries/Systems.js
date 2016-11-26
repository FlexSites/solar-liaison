
/**
 * GraphQL Types
 */
const {
  GraphQLList,
  GraphQLString,
} = require('graphql')

/**
 * Local Types
 */
const System = require('../Types/System').default

/**
 * Data Sources
 */
const accounts = require('../../lib/resources/account')
const fauxMeasurement = require('../../mocks/measurements').default


const getEvents = (source) => {
  const dates = source.date

  const events = Object.keys(dates).map((name) => {
    return {
      title: name,
      data: dates[name],
    }
  })

  console.info('events', events)
  return events
}


exports.default = {
  type: new GraphQLList(System),
  args: {
    step: { type: GraphQLString },
    // FIXME: custom scalars for date-time
    start: { type: GraphQLString },
    end: { type: GraphQLString },
  },
  resolve: (source, args, context, info) => {
    console.info('system resolver')
    return accounts.findByIds(context.profile.accountNumbers)
      .then((accounts) => {
        return accounts.map(account => ({
          address: account._source.address,
          progress: getEvents(account._source),
          production: fauxMeasurement(),
          consumption: fauxMeasurement(),
        }))
      })
  },
}
