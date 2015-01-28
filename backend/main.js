var path = require('path')
  , debug = require('debug')('patchrender.main')
  , express = require('express')
  , request = require('request')
  , pdfu = require('pd-fileutils')
//  , bodyParser = require('body-parser')
//  , serveStatic = require('serve-static')
  , config = require('./config')
  , app = express()

// Configure express app
app.set('port', config.port)
//app.use(bodyParser.json())

// Setup other routes
app.route('/render').get(function(req, res) {
  var fetch = req.query.fetch
  request.get(fetch, function(err, fetchRes) {
    if (err) throw err
    res.setHeader('content-type', 'image/svg+xml')
    res.end(pdfu.renderSvg(pdfu.parse(fetchRes.body)))
  })
})

// Setup static routes
//app.use('/css', serveStatic(path.join(config.web.rootPath, 'css')))

app.listen(app.get('port'), function() {
  console.log('server started')
})