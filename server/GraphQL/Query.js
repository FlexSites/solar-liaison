
const {
  GraphQLObjectType,
} = require('graphql')

const Me = require('./Types/Me').default

const Query = new GraphQLObjectType({
  name: 'LiaisonSchema',
  description: 'Root of the Liaison Schema',
  fields: () => ({
    me: {
      type: Me,
      resolve: (source, args, context, info) => {
        const me = {
          account: context.user,
          // Fetch this from CouchDB
          profile: context.profile,
        }

        context.Me = me
        return me
      },
    },
  }),
})

exports.default = Query
