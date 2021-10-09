export default {
  typescript: {
    compile: 'tsc',
    rewritePaths: {
      'src/': 'dist/src/',
      'test/': 'dist/test/'
    }
  }
}
