
const {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

const config = require('config')


const Contact = new GraphQLObjectType({
  name: 'ContactInfo',
  description: 'Primary contact info',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.full_name,
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.work_phone_number_full || '1-877-404-4129',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.work_email_address || 'help@vivintsolar.com',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.position_title || source.business_title,
    },
    photo: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => {
        const badgeId = source.badge_id
        const url = config.get('employee.photoUrl')

        return `${url}/${badgeId}`
      },
    },
    textable: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: () => true,
    },
  }),
})

exports.default = Contact
