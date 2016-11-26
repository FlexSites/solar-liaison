
const config = require('config')
const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client(config.get('db.elasticsearch'))

exports.findByIds = (ids) => {
  console.info('findByIds')

  return client.search({
    index: 'sales_index',
    type: 'sales_project',
    body: {
      filter: {
        terms: {
          account_no: ids,
        },
      },
    },
  }).then((body) => {
    console.info(`found ${body.hits.hits.length}`)
    return (body && body.hits && body.hits.hits)
  })
}
