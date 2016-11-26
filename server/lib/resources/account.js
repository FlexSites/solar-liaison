
const client = require('./elasticsearch').default

exports.findByIds = (ids) => {
  return client
    .search({
      index: 'sales_index',
      type: 'sales_project',
      body: {
        filter: {
          terms: {
            account_no: ids,
          },
        },
      },
    })
    .then((body) => body && body.hits && body.hits.hits)
}
