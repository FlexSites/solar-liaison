
const GraphQL = require('graphql')
const GraphQLObjectType = GraphQL.GraphQLObjectType
const GraphQLNonNull = GraphQL.GraphQLNonNull
const GraphQLString = GraphQL.GraphQLString
const GraphQLList = GraphQL.GraphQLList

const Measurement = require('./Measurement').default

const Address = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    street: {
      type: new GraphQLNonNull(GraphQLString),
    },
    street2: {
      type: GraphQLString,
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
    },
    state: {
      type: new GraphQLNonNull(GraphQLString),
    },
    zip: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})


const System = new GraphQLObjectType({
  name: 'SolarSystem',
  description: 'Solar Panel System',
  fields: () => ({
    address: {
      type: new GraphQLNonNull(Address),
    },
    production: {
      type: new GraphQLList(Measurement),
    },
    consumption: {
      type: new GraphQLList(Measurement),
    },
  }),
})


exports.default = System
