// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.

    // browsers: ['PhantomJS'], 结合 vue-test-utils 挂载时 执行 mount() 会报错
    // browsers 数组有多项时，将同时调用数组内的所有浏览器开始 unit test
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'], // 浏览器
    // https://github.com/karma-runner/karma-chrome-launcher
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'], // 设置测试覆盖率输出插件
    files: ['./index.js'], // 测试入口文件
    preprocessors: { // 用webpack解析，同时显示测试文件路径
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: { // karma-coverage配置，配置测试覆盖率的输出目录及格式
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' }, // 输出 Icov.info
        { type: 'text-summary' }, // 输出 网页报告 Icov-report
        { type: 'json', subdir: '.' } // 输出 coverage-final.json
      ]
    }
  })
}
