var assert = require('assert')
var path = require('path')
var fs = require('fs')

module.exports = function readFileTree (basedir, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  assert.equal(typeof basedir, 'string', 'read-file-tree: basedir must be string')
  assert.equal(typeof opts, 'object', 'read-file-tree: opts must be object')
  assert.equal(typeof cb, 'function', 'read-file-tree: callback must be function')

  read(basedir, cb)

  function read (basedir, cb) {
    var parent = {}
    fs.readdir(basedir, function (err, files) {
      if (err) return cb(err)
      var done = 0
      for (var i = 0; i < files.length; i++) {
        onpath(files[i])
      }

      function onpath (filename) {
        var fullname = path.join(basedir, filename)
        fs.stat(fullname, function (err, stat) {
          if (err) return cb(err)
          if (stat.isDirectory()) {
            ondir(fullname, filename)
          } else {
            onfile(fullname, filename)
          }
        })
      }

      function ondir (fullname, filename) {
        read(fullname, function (err, sub) {
          if (err) return cb(err)
          parent[filename] = sub
          ondone()
        })
      }

      function onfile (fullname, filename) {
        fs.readFile(fullname, opts.encoding || null, function (err, contents) {
          if (err) return cb(err)
          parent[filename] = contents
          ondone()
        })
      }

      function ondone () {
        done++
        if (done === files.length) {
          cb(null, parent)
        }
      }
    })
  }
}
