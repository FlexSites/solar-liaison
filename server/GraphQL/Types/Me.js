

const {
  GraphQLObjectType,
} = require('graphql')

const UserQuery = require('../Queries/User').default
const ContactQuery = require('../Queries/Contact').default
const SystemsQuery = require('../Queries/Systems').default

const Me = new GraphQLObjectType({
  name: 'Me',
  description: 'This represents the context of the active user',
  fields: () => ({
    user: UserQuery,
    contact: ContactQuery,
    systems: SystemsQuery,
  }),
})

exports.default = Me
