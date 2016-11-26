
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

exports.default = {
  type: new GraphQLList(System),
  args: {
    step: { type: GraphQLString },
    // FIXME: custom scalars for date-time
    start: { type: GraphQLString },
    end: { type: GraphQLString },
  },
  resolve: (source, args, context, info) => {
    return accounts.findByIds(context.profile.accountNumbers)
  },
}
