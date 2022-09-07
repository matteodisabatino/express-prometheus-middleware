var fs = require('fs')

if (process.platform === 'win32') {
  var packageContent = fs.readFileSync('package.json')
  fs.writeFileSync('dist/package.json', packageContent)
} else {
  fs.symlinkSync('../package.json', 'dist/package.json')
}
