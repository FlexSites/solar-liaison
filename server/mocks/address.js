
const casual = require('casual')

exports.default = {
  street: casual.address1,
  street2: casual.address2,
  state: casual.state_abbr,
  zip: casual.zip,
}
