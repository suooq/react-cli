const devServer = Object.assign(
  {
    // 默认
    noInfo: true,
    stats: 'none',
    overlay: true,
  },
  {
    // 基本
    port: 3000,
    host: 'localhost',
    compress: true,
    hot: true
  }
)

module.exports = devServer