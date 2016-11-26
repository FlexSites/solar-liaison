
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require('graphql')

const Contact = require('./Contact').default
const Measurement = require('./Measurement').default
const Progress = require('./Progress').default

const employeeResource = require('../../lib/resources/employee')

const Address = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    street: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.address_1,
    },
    street2: {
      type: GraphQLString,
      resolve: source => source.address_2,
    },
    city: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    zip: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: source => source.postal_code,
    },
  }),
})


const System = new GraphQLObjectType({
  name: 'SolarSystem',
  description: 'Solar Panel System',
  fields: () => ({
    salesRep: {
      type: new GraphQLNonNull(Contact),
      resolve: (source) => employeeResource.findById(source._source.sales_mgr.emp_id),
    },
    address: {
      type: new GraphQLNonNull(Address),
      resolve: (source) => source._source.address,
    },
    progress: {
      type: new GraphQLList(Progress),
      resolve: (source) => {
        const dates = source._source.date
        return Object.keys(dates).map((name) => {
          return {
            title: name,
            data: dates[name],
          }
        })
      },
    },
    production: {
      args: {
        startDate: { type: GraphQLString },
        step: { type: GraphQLString },
      },
      type: Measurement,
      resolve: (source, args, context) => {
        const accountNumber = source._source.account_no
        const {
          step = 'daily',
          startDate,
        } = args

        const productionResource = context.loaders.production
        const fn = productionResource[step]

        if (!fn) throw new Error(`Step "${step}" not implemented`)

        return fn(accountNumber, startDate)
      },
    },
    consumption: {
      args: {
        startDate: { type: GraphQLString },
        step: { type: GraphQLString },
      },
      type: Measurement,
      resolve: (source, args, context) => {
        const accountNumber = source._source.account_no
        const {
          step = 'daily',
          startDate,
        } = args

        const productionResource = context.loaders.production

        if (!productionResource[step]) throw new Error(`Step "${step}" not implemented`)

        return productionResource[step](accountNumber, startDate)
          .then((data) => {
            console.error('Consumption isn\'t real. This will just be 7x of production')
            data.measurements.forEach((measurement) => {
              measurement.value = measurement.value * 7
            })
            return data
          })
      },
    },
  }),
})


exports.default = System
