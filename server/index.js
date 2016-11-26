
const express = require('express')
const graphHTTP = require('express-graphql')

const app = express()
const port = process.env.PORT || 5000

const schema = require('./GraphQL/Schema').default


app.use((req, res, next) => {
  req.user = require('./mocks/user').default
  res.locals.profile = {
    repID: '105425',
    accountNumbers: [ '4399783', '4399743', '4399771' ],
  }
  next()
})

app.use('/graph', graphHTTP((req, res) => ({
  schema,
  graphiql: true,
  context: {
    profile: res.locals.profile,
    loaders: res.locals.dataloaders,
    user: req.user,
  },
})))


app.listen(port, () => {
  console.info(`Listening on port ${port}`)
})
