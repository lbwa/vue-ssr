# vue-ssr

> A Vue.js Server-Side Rendering implementation

[![Build Status](https://travis-ci.org/lbwa/vue-ssr.svg?branch=master)](https://travis-ci.org/lbwa/vue-ssr)
[![codecov](https://codecov.io/gh/lbwa/vue-ssr/branch/master/graph/badge.svg)](https://codecov.io/gh/lbwa/vue-ssr)

## Mind map

![mind-map][mind-map]

以上是开发环境下的 `SSR mind map`。生产环境中逻辑较为简单，就是没有 `webpack dev server`，其中页面渲染的是打包过后产生的 `server bundle` 和 `clientManifest` 构成的 `renderer`，并与 `ctx` 、`template.ejs` 合并渲染出用户界面。

[mind-map]:https://raw.githubusercontent.com/lbwa/vue-ssr/master/SSR%20mind%20map.png

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

## 使用 createBundleRenderer 渲染
npm run build

## 使用 createRenderer 渲染
npm run build:no-bundle

# Running server in production mode at localhost:8889
npm run build && npm run start

# build for production and view the bundle analyzer report
npm run analyze

# run unit tests
npm run unit
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## createBundleRenderer 与 createRenderer 差异

| API | 优势 | 弊端 |
| --- | ---- | ---- |
| `createBundleRenderer` | 使用 `memory-fs` 时，同时亦可使用异步路由组件，这将带来高效的性能优势（内存读写速度快，异步组件加载快） | 页面重定向必须发生在 `renderToString` 之后，那么将要被重定向的页面仍会参与渲染 |
| `createRenderer` | 可在 `renderToString` 之前，重定向页面 | 在使用 `memory-fs` 时，不能使用 异步路由组件，因为无法在内存中找到相应组件 |

综上，二者的优势侧重点有所不同，`createBundleRenderer` 侧重在整个项目的高效性能，`createRenderer` 侧重避免不必要的页面渲染，以在 `SSR` 过程中减小页面重定向时给服务器带来的压力。
