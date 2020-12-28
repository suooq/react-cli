const webpack = require('webpack');
const webpackConfig = require('../build/webpack.config')('production');
const compiler = webpack(webpackConfig);

function build() {
  return new Promise((resulve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(stats);
      }
      resulve(stats);
    });
  });
}

async function run() {
  try {
    const result = await build();
    console.clear();
    console.log(
      result.toString('minimal'),
    );
  } catch (error) {
    console.clear();
    console.log(
      error.toString({ colors: true }),
    );
  }
}
// go
run();
