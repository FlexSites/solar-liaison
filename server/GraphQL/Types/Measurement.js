
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
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

exports.default = Measurement
