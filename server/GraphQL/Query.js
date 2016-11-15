
const GraphQL = require('graphql')
const GraphQLObjectType = GraphQL.GraphQLObjectType
const GraphQLList = GraphQL.GraphQLList
const GraphQLString = GraphQL.GraphQLString

const User = require('./Types/User').default
const System = require('./Types/System').default

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
            address: {
              street: '1234 Poker st',
              city: 'Orem',
              state: 'UT',
              zip: '84058',
            },
            production: [
              {
                unit: 'kW',
                value: 1234.634,
                created: new Date().toISOString(),
              },
              {
                unit: 'kW',
                value: 1234.634,
                created: new Date().toISOString(),
              },
            ],
            consumption: [
              {
                unit: 'kW',
                value: 234.634,
                created: new Date().toISOString(),
              },
              {
                unit: 'kW',
                value: 234.634,
                created: new Date().toISOString(),
              },
              {
                unit: 'kW',
                value: 234.634,
                created: new Date().toISOString(),
              },
              {
                unit: 'kW',
                value: 234.634,
                created: new Date().toISOString(),
              },
            ],
          },
        ]
      },
    },
  }),
})

exports.default = Query
