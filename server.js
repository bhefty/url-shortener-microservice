'use strict'

const express = require('express')
const app = express()

app.get('/new/:url', function(req, res) {
  let originalUrl = req.params.url
  let shortUrl = "not defined"

  let urlResult = {
    original_url: originalUrl,
    short_url: shortUrl
  }

  res.send(urlResult)

})

app.get('/', function(req, res) {
  res.redirect('/new')
})

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('Server is listening.')
})
