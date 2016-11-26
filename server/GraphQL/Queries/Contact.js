
const Contact = require('../Types/Contact').default

exports.default = {
  type: Contact,
  resolve: (source, args, context, info) => {
    return require('../../mocks/contact').default
  },
}
