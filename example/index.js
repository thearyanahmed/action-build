'use strict'

const express = require('express')

// Constants
const PORT = 8081
const HOST = '0.0.0.0'

// App
const app = express()

app.get('/', (request, response) => {
  response.send('hello world')
})

app.listen(PORT, HOST)
console.log(`Internal service running on http://${HOST}:${PORT}`)