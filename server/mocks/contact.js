
const casual = require('casual')

exports.default = {
  name: casual.full_name,
  phone: casual.phone,
  email: casual.email,
  title: casual.title,
  photo: 'http://lorempixel.com/400/400/',
  textable: casual.boolean,
}
