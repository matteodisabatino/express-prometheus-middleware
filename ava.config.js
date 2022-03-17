module.exports = {
  nodeArguments: [
    '--expose_gc'
  ],
  typescript: {
    compile: 'tsc',
    rewritePaths: {
      'src/': 'dist/src/',
      'test/': 'dist/test/'
    }
  },
  workerThreads: false
}
