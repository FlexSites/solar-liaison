
const express = require('express')
const graphHTTP = require('express-graphql')

const app = express()
const port = process.env.PORT || 5000

const schema = require('./GraphQL/Schema').default


app.use('/', (req, res, next) => {
  req.user = require('./mocks/user').default
  next()
})

app.use('/graph', graphHTTP((req) => ({
  schema,
  graphiql: true,
  context: { user: req.user },
})))


app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})
