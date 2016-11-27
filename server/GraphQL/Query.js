
const {
  GraphQLObjectType,
} = require('graphql')

const config = require('config')
const nano = require('nano')(config.get('couchdb.host'))

const db = nano.use('user_profiles')

const Me = require('./Types/Me').default

const Query = new GraphQLObjectType({
  name: 'LiaisonSchema',
  description: 'Root of the Liaison Schema',
  fields: () => ({
    me: {
      type: Me,
      resolve: (source, args, context, info) => {
        return new Promise((resolve, reject) => {
          db.get('a65b10bf51791addb69b478e72bc14c3', (err, body) => {
            if (err) return reject(err)
            const profile = body.profiles
            profile.liason = {
              locationKey: 2197569,
            }
            const me = {
              account: context.user,
              profile: body.profiles,
            }
            context.Me = me

            return resolve(me)
          })
        })
      },
    },
  }),
})

exports.default = Query
