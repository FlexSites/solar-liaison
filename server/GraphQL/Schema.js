
const { GraphQLSchema } = require('graphql')

const Query = require('./Query').default

const Schema = new GraphQLSchema({
  query: Query,
})

exports.default = Schema
