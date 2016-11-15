
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql')

const User = require('./Types/User').default
const System = require('./Types/System').default
const Contact = require('./Types/Contact').default

const Query = new GraphQLObjectType({
  name: 'LiaisonSchema',
  description: 'Root of the Liaison Schema',
  fields: () => ({
    user: {
      type: User,
      resolve: (source, args, context, info) => {
        return context.user
      },
    },
    contact: {
      type: Contact,
      resolve: (source, args, context, info) => {
        return require('../mocks/contact').default
      },
    },
    systems: {
      type: new GraphQLList(System),
      args: {
        step: { type: GraphQLString },
        // FIXME: custom scalars for date-time
        start: { type: GraphQLString },
        end: { type: GraphQLString },
      },
      resolve: (source, args, context, info) => {
        return [
          {
            address: require('../mocks/address').default,
            progress: require('../mocks/progress').default(),
            production: require('../mocks/measurements').default(),
            consumption: require('../mocks/measurements').default(),
          },
        ]
      },
    },
  }),
})

exports.default = Query
