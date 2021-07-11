const express = require('express')
const api = require('./router/api')

const app = express()

app.use('/api', api)

app.listen('3000')
