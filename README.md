# read-file-tree

recursively read contents of all files in a directory

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/read-file-tree.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/read-file-tree
[travis-image]: https://img.shields.io/travis/goto-bus-stop/read-file-tree.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/read-file-tree
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install read-file-tree
```

## Usage

```js
var readFileTree = require('read-file-tree')

readFileTree('/path/to/directory', function (err, tree) {
  console.log(tree)
})
```

## API

### `readFileTree(basedir[, opts], cb)`

Recursively read contents of all files in the directory `basedir`.
`opts` can be an object:

 - `opts.encoding` - encoding to pass to [`fs.readFile()`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback), by default a Buffer is returned

`cb` is a node-style callback receiving an `error` in the first parameter, and a `tree` object in the second.
Object keys in the `tree` object are file names, while values are the file contents. Nested directories have another `tree` object as their value.
For example, the [test/fixture](./test/fixture) directory results in this object:

```js
{ 'one.js': '1;\n',
  'two.js': '2;\n',
  a: {
    b: {
      'c.txt': 'this is c\n',
      c: {
        'd.txt': 'file d\n' } } } }
```

### `readFileTree.sync(basedir[, opts])`

The same, but sync. Returns `tree`.

## See Also

 * [write-file-tree](https://github.com/goto-bus-stop/write-file-tree) - write an object to nested file tree, with one file for each value
 * [flat](https://github.com/hughsk/flat) - flatten and unflatten objects—you can use this to create an object with relative paths as keys:
   ```js
   flat(readFileTree('./dest'), { delimiter: '/' })
   // { 'a.txt': '',
   //   'some/dir/name/b.txt': '' }
   ```

## License

[MIT](LICENSE.md)
