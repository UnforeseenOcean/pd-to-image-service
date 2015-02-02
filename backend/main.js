var path = require('path')
  , debug = require('debug')('patchrender.main')
  , express = require('express')
  , request = require('request')
  , pdfu = require('pd-fileutils')
  , config = require('./config')
  , app = express()

// Configure express app
app.set('port', config.port)

// Setup other routes
app.route('/render').get(function(req, res) {
  var fetch = req.query.fetch
  request.get(fetch, function(err, fetchRes) {
    if (err) throw err
    res.setHeader('content-type', 'image/svg+xml')
    res.end(pdfu.renderSvg(pdfu.parse(fetchRes.body)))
  })
})

app.listen(app.get('port'), function() {
  console.log('server started')
})