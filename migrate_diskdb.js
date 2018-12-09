const _ = require('lodash')
const data = require('./db_data')

const db = require('diskdb')
db.connect('./db/', ['countries', 'rules'])

_.forEach(data['countries'], (c) => {
  db.countries.save(c)
})

_.forEach(data['taxRules'], (c) => {
  db.rules.save(c)
})
