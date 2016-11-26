
const config = require('config')
const elasticsearch = require('elasticsearch')

exports.default = new elasticsearch.Client(config.get('elasticsearch'))
