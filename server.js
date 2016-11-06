'use strict'

const express = require('express')
const path = require('path')
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

app.get('/new', function(req, res) {
  res.send('Error: You need to add a proper URL to your parameter.')
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/:redirect([0-9]+)', function(req, res) {
  res.redirect(originalUrl)
})

app.use(function(req, res, next) {
  res.status(404).send({ error: 'Wrong url format. Make sure you have a valid protocol and real site.' })
})


app.listen(process.env.PORT || 8080, function(req, res) {
  console.log('Server is listening.')
})
