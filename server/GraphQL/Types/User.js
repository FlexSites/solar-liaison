
const GraphQL = require('graphql')
const GraphQLID = GraphQL.GraphQLID
const GraphQLList = GraphQL.GraphQLList
const GraphQLNonNull = GraphQL.GraphQLNonNull
const GraphQLObjectType = GraphQL.GraphQLObjectType
const GraphQLString = GraphQL.GraphQLString

const UserProfile = new GraphQLObjectType({
  name: 'UserProfile',
  description: 'User profile information',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User full name',
    },
    givenName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User given name',
    },
    familyName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User family name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User\'s email address',
    },
    badgeId: {
      type: GraphQLString,
      description: 'Badge ID (if employed)',
    },
  }),
})

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents the currently logged-in user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'User ID',
    },
    provider: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'IDP Provider',
    },
    providerId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'User\'s IDP ID',
    },
    profile: {
      type: new GraphQLNonNull(UserProfile),
    },
    groups: {
      type: new GraphQLList(GraphQLString),
      description: 'User authorizations',
    },
  }),
})

exports.default = User
