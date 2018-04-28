// 整合客户端 bundle（clientManifest）和服务端 bundle 以用于 ejs 渲染

const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs') // nodejs 文件系统，文件 I/O 是对标准 POSIX 函数的简单封装
const MemoryFS = require('memory-fs') // 操作内存而非常规硬盘的 fs
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

// 用于渲染客户端构建信息、服务器 bundle和 HTML 包裹器
const serverRender = require('./server-render')

// 该配置用于生成传递给 createBundleRenderer 的服务器 bundle
const serverConfig = require('../../build/webpack.server.config')

/**
 * 得到一个 webpack 编译器实例（webpack compiler），返回一个重新打包的 服务器 bundle
 * 1. webpack({ 配置对象 })
 * 2. 当传入第二个参数，一个回调函数，就会执行 webpack compiler
 * https://doc.webpack-china.org/api/node/
 */
const serverCompiler = webpack(serverConfig)

/**
 * 自定义文件系统。
 * 1. 将打包文件输入至内存中，而非默认的硬盘存储
 * https://doc.webpack-china.org/api/node/#自定义文件系统-custom-file-systems-
 */
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

// server bundle
let bundle

/**
 * watch API 在有文档变化时，就会执行编译打包
 * 1. 该 API 一次只支持一个并发编译
 * 2. 该 API 返回一个 watching 实例
 * https://doc.webpack-china.org/api/node/#%E7%9B%91%E5%90%AC-watching-
 */
serverCompiler.watch({/* watch options */}, (err, stats) => {
  // err 对象 仅 包含 webpack 打包时的错误(如配置错误，缺失 module)，不包含编译错误
  if (err) throw err

  /**
   * stats 对象包含编译过程中的有用信息，其中包含编译错误，警告等一些统计信息
   * stats 文档：https://doc.webpack-china.org/configuration/stats
   */

  // 以 JSON 对象形式返回编译信息
  stats = stats.toJson()

  // 输出编译时的错误信息
  stats.errors.forEach(err => console.log(err))

  // 输出编译时的警告信息
  stats.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(
    serverConfig.output.path,

    // server.config 中 new VueServerPlugin 参数
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('New server bundle has been created')
})

const handleSSR = async (ctx) => {
  // 第一次打包时，因为速度原因，执行至此的时候,bundle 仍在构建中
  if (!bundle) {
    ctx.body = '加载中...'
    return
  }

  // 获取客户端构建清单，即客户端 bundle（另一个 server 的数据）
  // vue-ssr-client-manifest.json 是 webpack.dev.config 中 VueClientPlugin 默认生成文件名
  const clientManifestResp = await axios.get(
    // http://koajs.com/#context
    // 因为 Koa 将 Node request 对象封装至 ctx 上，所以此处 ctx 对象被赋予了请求地址，即此时存在了 ctx.path(ctx.request.path 的别名)
    'http://127.0.0.1:8080/public/vue-ssr-client-manifest.json'
  )

  // 在 await resolved 后，即得到 clientManifestResp，继续执行
  const clientManifest = clientManifestResp.data

  /**
   * 指定一个页面模板包裹渲染的结果
   * 在渲染 vue 应用时，renderer 只生成 body 标签内的内容，需要指定 HTML 页面包裹器
   * https://ssr.vuejs.org/zh/basic.html
   */
  const template = fs.readFileSync(
    path.join(__dirname, '../server-template.ejs'),
    'utf-8'
  )

  /**
   * 创建一个 bundle renderer 实例，用于支持 source map 和解决热重载问题
   * 1. node.js 本身不支持 source map
   * 2. bundle renderer 指引：https://ssr.vuejs.org/zh/bundle-renderer.html
   * 3. 生成一个 JSON 文件
   */
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      // 控制使用 template 时是否执行自动注入。默认为 true，即自动执行注入
      // https://ssr.vuejs.org/zh/build-config.html#manual-asset-injection
      inject: false,

      // 客户端构建清单
      // https://ssr.vuejs.org/zh/build-config.html#manual-asset-injection
      clientManifest

      /**
       * renderer 有了服务器 bundle 和客户端 clientManifest 的构建信息，因此可自动
       * 判断和注入资源预加载/数据预取指令，以及 css 链接 / script 标签到所渲染的
       * HTML。
       */
    })

  // 渲染得到的 renderer (客户端构建信息、服务器 bundle) 和 HTML 页面包裹器（模板）
  // 最后返回用户看到的 HTML 页面
  await serverRender(ctx, renderer, template)
}

const router = new Router()

/**
 * 监听所有请求，并设置 handleSSR 为处理请求的回调函数
 * 1. 特别地，会向回调中传入 context ，并作为接收器使用，即作为渲染上下文使用。
 * 2. context 对象将被赋予各种属性，这些属性即是请求将要返回的数据，即渲染所需的信息
 * https://github.com/alexmingoia/koa-router#module_koa-router--Router+get%7Cput%7Cpost%7Cpatch%7Cdelete%7Cdel
 */
router.get('*', handleSSR)

module.exports = router
