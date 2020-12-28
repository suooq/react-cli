
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('../build/webpack.config')

const webpackConfig = configFactory('development');
const { devServer } = webpackConfig;
const { host, port } = devServer;
const compiler = webpack(webpackConfig);

compiler.hooks.compilation.tap('cplog', compilation => {
  compilation.hooks.buildModule.tap('cplog', module => {
    console.clear()
    console.log(
      chalk.yellow('Compiling...'),
      chalk.yellow('\nStart compiling:'),
      module.rawRequest
    );
  })
})
compiler.hooks.done.tap('cplog', stats => {
  console.clear()
  if (stats.hasErrors() || stats.hasWarnings()) {
    const { errors, warnings } = stats.toJson()
    console.log(
      chalk.bgRed(' Find Error ')
    );
    if (errors.length) {
      const { message } = errors[0]
      console.log(message);
    }

    if (warnings.length) {
      const { message } = warnings[0]
      console.log(message);
    }
  } else {
    console.log(
      chalk.green('Compiler Successful')
    )
    console.log(
      chalk.cyan(`\nYou application is running here http://${host}:${port}`)
    );
  }
})

const server = new WebpackDevServer(compiler, devServer);
server.listen(port, host);
