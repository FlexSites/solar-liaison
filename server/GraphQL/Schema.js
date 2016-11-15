
const GraphQL = require('graphql')
const GraphQLSchema = GraphQL.GraphQLSchema


const Query = require('./Query').default

const Schema = new GraphQLSchema({
  query: Query,
})

exports.default = Schema
