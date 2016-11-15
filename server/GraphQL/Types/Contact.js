
const {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')


const Contact = new GraphQLObjectType({
  name: 'ContactInfo',
  description: 'Primary contact info',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    photo: { type: new GraphQLNonNull(GraphQLString) },
    textable: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
})

exports.default = Contact
