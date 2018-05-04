// dev-ssr 的另一种实现方式，使用 createRenderer 而不是 createBundleRenderer

const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

// const NativeModule = require('module')
// const vm = require('vm')

// const serverRender = require('./server-render')
// const serverConfig = require('../../build/webpack.server.config')
const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.server-no-bundle.config')
const serverCompiler = webpack(serverConfig)

// const mfs = new MemoryFS()
// serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err

  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js'
  )

  // 在使用 createRenderer ，且不使用 mfs 时使用以下代码

  // 因为 require 不同于 import ，它会缓存模块，故使用 delete 删除缓存
  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry.js').default

  // 在使用 createRenderer 而不是 createBundleRender，且使用 mfs 时使用以下代码

  // try {
  //   const m = { exports: {} }
  //   const bundleString = mfs.readFileSync(bundlePath, 'utf-8')

  //   // function (module, exports, require)
  //   const wrapper = NativeModule.wrap(bundleString)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (err) {
  //   console.error('\nCompile server-entry.js fail :', err)
  // }

  // bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('New server bundle has been created')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '加载中...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8080/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server-template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createRenderer({
      inject: false,
      clientManifest
    })

  // 传入  bundle
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
