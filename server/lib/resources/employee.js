
const client = require('./elasticsearch').default

exports.findById = (id) => {
  return client
    .get({
      index: 'employee_current_index',
      type: 'employee_current',
      id,
    })
    .then((body) => body.found && body._source)
}
