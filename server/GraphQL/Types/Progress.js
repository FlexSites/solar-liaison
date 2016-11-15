
const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const Step = new GraphQLObjectType({
  name: 'ProgressStep',
  description: 'A single step in the sales/installation process',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLString },
  }),
})

const Progress = new GraphQLObjectType({
  name: 'SystemProgress',
  description: 'Progress through the sales and installation process',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    complete: { type: new GraphQLNonNull(GraphQLString) },
    steps: { type: new GraphQLList(Step) },
  }),
})

exports.default = Progress
