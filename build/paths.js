const path = require('path')
const genAppPath = (str = '') => path.resolve(process.cwd(), str)

const paths = {
  resolve: genAppPath,
  
  root: genAppPath(),

  src: genAppPath('src'),
  appIndex: genAppPath('src/index.js'),

  public: genAppPath('public'),
  appHtml: genAppPath('public/index.html'),

  dist: genAppPath('dist'),
  build: genAppPath('build'),
  scripts: genAppPath('scripts'),

  assets: genAppPath('src/assets'),
  components: genAppPath('src/components'),
  services: genAppPath('src/services'),
  models: genAppPath('src/models'),
  pages: genAppPath('src/pages')
}

module.exports = paths
