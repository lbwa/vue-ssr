import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all client files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const clientContext = require.context('../../client', true, /^\.\/(?!(main|create-app|client-entry|server-entry)(\.js)?$)/)
clientContext.keys().forEach(clientContext)
