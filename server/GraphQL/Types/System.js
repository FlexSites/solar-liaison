
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
      resolve: (source) => {
        console.info('source', source)
        return source.address_1
      },
    },
    street2: {
      type: GraphQLString,
      resolve: source => source.address_2,
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.city,
    },
    state: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.state,
    },
    zip: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.postal_code,
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
