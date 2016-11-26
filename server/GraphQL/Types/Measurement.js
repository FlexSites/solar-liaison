
const {
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require('graphql')


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

const MeasurementCollection = new GraphQLObjectType({
  name: 'MeasurementCollection',
  description: 'Energy Measurements over a given time',
  fields: () => ({
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    total: { type: new GraphQLNonNull(GraphQLInt) },
    step: { type: new GraphQLNonNull(GraphQLString) },
    measurements: { type: new GraphQLList(Measurement) },
  }),
})

exports.default = MeasurementCollection
