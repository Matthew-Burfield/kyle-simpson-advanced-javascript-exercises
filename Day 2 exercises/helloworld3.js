function readFile (filename) {
  return ASQ(function (done) {

    var stream = fs.createReadStream(filename)
    var contents = ''

    stream.pipe(fs.createWriteStream(filename + '.backup'))

    stream.on('data', function (chunk) {
      contents += chunk
    })
    stream.on('end', function () {
      done(contents)
    })
  })

}

function delayMsg (done, contents) {
  setTimeout(function () {
    done(contents)
  }, 1000)
}

function say (filename) {
  return readFile(filename)
    .then(delayMsg)
}

var fs = require('fs') // file system
var ASQ = require('asynquence')
require('asynquence-contrib')

module.exports.say = say 
