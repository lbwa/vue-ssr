# vue-ssr

> A Vue.js Server-Side Rendering implementation

[![Build Status](https://travis-ci.org/lbwa/vue-ssr.svg?branch=master)](https://travis-ci.org/lbwa/vue-ssr)
[![codecov](https://codecov.io/gh/lbwa/vue-ssr/branch/master/graph/badge.svg)](https://codecov.io/gh/lbwa/vue-ssr)

| 登录名 username | 登录密码 password |
| -------------- | ----------------- |
| admin | admin |

具体实现流程是参照官方 vue SSR [指南]。主要实现工具是 `vue-server-renderer`。

[指南]:https://ssr.vuejs.org/zh/
## Feature

- [x] 基础 SSR ，其中包括环境构建，页面渲染，数据预取和数据共享。
- [x] 可在**不使用** `vuex` 的情况（`no-vuex` 分支）下，实现 `client` 端和 `SSR server` 端共用一个 `store` (以 `window.__INITIAL_STATE__` 为传递介质，在 `client-entry` 中验证预取数据，并实现共享操作)。
- [x] 用户未登录时，进入 `/app` 将结束当前页面渲染并重定向页面至登录页面 `/login`，其中实现了平滑过渡没有闪烁。
- [x] 用户登录成功/失败，添加事件，完成事件，删除事件都将弹出提示。

注：项目需另配置 [database]，[appId]，[appKey]

![intro][intro]

[intro]: https://raw.githubusercontent.com/lbwa/vue-ssr/master/intro.gif

[database]: https://github.com/lbwa/vue-ssr/blob/master/server/db/db.js

[appId]: https://github.com/lbwa/vue-ssr/blob/master/app.config.js

[appKey]: https://github.com/lbwa/vue-ssr/blob/master/app.config.js
## Mind map

![mind-map][mind-map]

[mind-map]:https://raw.githubusercontent.com/lbwa/vue-ssr/master/SSR%20mind%20map.png

以上是开发环境下的 `SSR mind map`。

## Build in production mode

本项目生产环境打包默认以 `createRenderer` 方式进行，而非 `createBundleRenderer` 方式，那么以上图中 `renderer`仅由 `clientManifest` **单独**生成，那么 `serverRender` 将改为接受 `renderer`，`ctx`，`template.ejs`，`server bundle`来合并渲染出用户所看到的界面。这么做是为了能在生成 `renderer` 前（即调用最耗时的操作 `renderToString`之前），跳转路由（[createBundleRenderer 方式下的路由跳转]，[createRenderer 方式下的路由跳转]）。

[createBundleRenderer 方式下的路由跳转]:https://github.com/lbwa/vue-ssr/blob/master/server/routers/server-render.js#L27-L37

[createRenderer 方式下的路由跳转]:https://github.com/lbwa/vue-ssr/blob/master/server/routers/server-render-no-bundle.js#L13-L16

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080

## 使用 createBundleRenderer 渲染
npm run dev

## 使用 createRenderer 渲染
npm run dev:no-bundle

# build for production with minification

## 使用 createRenderer 渲染
npm run build

# Running server in production mode at localhost:8889
npm run build && npm run start

or

npm run build && pm2 start pm2.yml

# build for production and view the bundle analyzer report
npm run analyze

# run unit tests
npm run unit
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

注：本项目生产环境打包默认以 `createRenderer` 方式进行，可在 `npm run build` 执行之后，执行 `pm2 start pm2.yml` （需提前全局安装 `pm2`）查看最后打包生成的生产环境页面。

## createBundleRenderer 与 createRenderer 差异

| API | 优势 | 弊端 |
| --- | ---- | ---- |
| `createBundleRenderer` | 使用 `memory-fs` 时，同时亦可使用异步路由组件，这将带来高效的性能优势（内存读写速度快，异步组件加载快） | 页面重定向必须发生在 `renderToString` 之后，那么将要被重定向的页面仍会参与渲染 |
| `createRenderer` | 可在 `renderToString` 之前，重定向页面 | 在使用 `memory-fs` 时，不能使用 异步路由组件，因为无法在内存中找到相应组件 |

综上，二者的优势侧重点有所不同，`createBundleRenderer` 侧重在整个项目的高效性能，`createRenderer` 侧重避免不必要的页面渲染，以在 `SSR` 过程中减小页面重定向时给服务器带来的压力。
