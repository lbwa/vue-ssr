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
npm run dev

# build for production with minification
npm run build

# Running server in production mode at localhost:8889
npm run build && npm run start

# build for production and view the bundle analyzer report
npm run analyze

# run unit tests
npm run unit
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
