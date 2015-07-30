var express = require('express')
var app = express()
var path = require('path')

var staticPath = path.join(__dirname, '../', process.argv[2] || '')
console.log('staticPath: ' + staticPath)

app.use(require('./routes'))
app.use(express.static(staticPath))

app.listen(3000)
