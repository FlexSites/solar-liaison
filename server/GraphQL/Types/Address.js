
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql')

const Address = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    street: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.address_1,
    },
    street2: {
      type: GraphQLString,
      resolve: source => source.address_2,
    },
    city: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    zip: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.postal_code,
    },
  }),
})

exports.default = Address
