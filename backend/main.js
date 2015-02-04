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

  // Missing param
  if (!fetch) {
    res.status(400)
    res.end('Missing query param "fetch".')
  } else {

    request.get(fetch, function(err, fetchRes) {
      // Handle errors
      if (err) {
        if (err.code === 'ENOTFOUND') {
          res.status(400)
          res.end('Address "' + fetch + '" not found')
        } else throw err
      } else if (fetchRes.statusCode === 200) {
        // Catch parsing errors
        try {
          var patch = pdfu.parse(fetchRes.body)
        } catch(err) {
          res.status(500)
          return res.end('Error parsing the patch :\n' + err)
        }
        // Catch rendering errors
        try {
          var rendered = pdfu.renderSvg(patch)
        } catch(err) {
          res.status(500)
          return res.end('Error rendering the patch :\n' + err)
        }
        // Return rendered SVG
        res.setHeader('content-type', 'image/svg+xml')
        res.end(rendered)

      // Non-200 responses
      } else {
        res.status(400)
        res.end('Received HTTP ' +  fetchRes.statusCode + ' while trying to fetch ' + fetch + '\n' + fetchRes.body)
      }
    })
  }
})

app.listen(app.get('port'), function() {
  console.log('server started')
})
