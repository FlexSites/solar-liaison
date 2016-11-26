
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
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }) => `Get me a description for "${title}"`,
    },
    completed: { type: GraphQLString },
  }),
})

const Progress = new GraphQLObjectType({
  name: 'SystemProgress',
  description: 'Progress through the sales and installation process',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ title }) => `Get me a description for "${title}"`,
    },
    steps: {
      type: new GraphQLList(Step),
      resolve: ({ data, title }) => {
        return Object.keys(data).map((action) => ({
          title: `${title} ${action}`,
          completed: data[action],
        }))
      },
    },
  }),
})

exports.default = Progress
