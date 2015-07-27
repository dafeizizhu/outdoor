var express = require('express')
var router = new express.Router()
var path = require('path')
var fs = require('fs')
var jade = require('jade')
var data = require('../data')

router.use(function (req, res, next) {
  if (req.path.match(/.*\.jade$/)) {
    var templateFilePath = path.join(__dirname, '../../', req.path)
    fs.readFile(templateFilePath, {
      encoding: 'utf-8'
    }, function (err, templateContent) {
      res.send((jade.compile(templateContent, {
        pretty: true
      })(data[req.path])))
    })
  } else {
    next()
  }
})

module.exports = router
