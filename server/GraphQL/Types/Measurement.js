
const GraphQL = require('graphql')
const GraphQLObjectType = GraphQL.GraphQLObjectType
const GraphQLNonNull = GraphQL.GraphQLNonNull
const GraphQLString = GraphQL.GraphQLString
const GraphQLFloat = GraphQL.GraphQLFloat


const Measurement = new GraphQLObjectType({
  name: 'Measurement',
  description: 'Energy Measurement',
  fields: () => ({
    unit: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    created: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})

exports.default = Measurement
