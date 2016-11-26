
const User = require('../Types/User').default

exports.default = {
  type: User,
  resolve: (source, args, context, info) => {
    return context.Me.account
  },
}
