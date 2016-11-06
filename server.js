'use strict'

const express = require('express')
const app = express()

let originalUrl

app.get('/new/:url(https?:\/\/?[\da-z\.-]+\.[a-z\.]{2,6}\/?)', function(req, res) {
  originalUrl = req.params.url
  let host = req.get('host')

  let randomNum = Math.floor(1000 + Math.random() * 9000)
  let shortUrl = host + '/' + randomNum
  if (shortUrl.match(/[localhost]/)) {
    shortUrl = 'http://' + shortUrl
  }

  let urlResult = {
    original_url: originalUrl,
    short_url: shortUrl
  }

  res.send(urlResult)

})

app.get('/', function(req, res) {
  res.redirect('/new')
})

app.get('/:redirect([0-9]+)', function(req, res) {
  res.redirect(originalUrl)
})

app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('Server is listening.')
})
