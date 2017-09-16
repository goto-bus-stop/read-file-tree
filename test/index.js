var test = require('tape')
var path = require('path')
var readFileTree = require('../')

test('read-file-tree', function (t) {
  readFileTree(path.join(__dirname, '/fixture'), function (err, tree) {
    if (err) t.fail(err)
    t.deepEqual(tree, {
      'one.js': Buffer.from('1;\n'),
      'two.js': Buffer.from('2;\n'),
      a: {
        b: {
          'c.txt': Buffer.from('this is c\n'),
          c: {
            'd.txt': Buffer.from('file d\n')
          }
        }
      }
    })
    t.end()
  })
})
