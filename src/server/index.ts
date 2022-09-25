const express = require('express')
const api = require('./router/api')
const test = require('./router/test')

const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.use('/api', api)
app.use(test)

app.listen('3000')
