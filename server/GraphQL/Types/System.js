
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql')

const Measurement = require('./Measurement').default
const Progress = require('./Progress').default

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
    address: { type: new GraphQLNonNull(Address) },
    progress: { type: new GraphQLList(Progress) },
    production: { type: new GraphQLList(Measurement) },
    consumption: { type: new GraphQLList(Measurement) },
  }),
})


exports.default = System
