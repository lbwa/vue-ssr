import { expect } from 'chai'
import createRouter from '@/config/router'

describe('router.js', () => {
  it('应该得到路由实例', () => {
    const router = createRouter()

    const routerType = typeof router
    const hasMode = !!router.mode

    expect(routerType).to.equal('object')
    expect(hasMode).to.equal(true)
  })
})
