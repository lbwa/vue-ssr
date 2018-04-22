// import { createTest, destroyVM } from '../util'
import ContentItem from '@/components/ContentItem'
import { mount } from '@vue/test-utils'
import { expect } from 'chai'

describe('ContentItem.vue', () => {
  it('根据不同的 props 渲染 todo 单项', () => {
    const vm = mount(ContentItem, {
      propsData: {
        item: {
          id: 0,
          content: 'Test Content',
          completed: false,
          isDeleted: false
        },
        checkStatu: true
      }
    }).vm

    expect(vm.$el.querySelector('label').textContent)
      .to.contain('Test Content')
  })

  /**
   * 在测试环境中，vue 组件不会监听任何事件，若有 watcher，需要手动触发。
   */

  it('测试点击 todo 单项事件 - refreshThisCompleted', done => {
    const wrapper = mount(ContentItem, {
      propsData: {
        item: {
          id: 0,
          content: 'Test Content',
          completed: false,
          isDeleted: false
        },
        checkStatu: true
      }
    })
    const button = wrapper.find('.toggle')

    // // 创建事件并触发
    // const evt = new Event('click') // Event() 代替 Document.createEvent() 成为标准
    // button.dispatchEvent(evt)
    // // 手动触发 watcher
    // vm._watcher.run()
    button.trigger('click')

    // 强制更新 props
    wrapper.setProps({
      item: {
        id: 0,
        content: 'Test Content',
        completed: true, // turn to true
        isDeleted: false
      },
      checkStatu: true
    })

    // vue 是异步更新 DOM
    // https://cn.vuejs.org/v2/guide/unit-testing.html
    wrapper.vm.$nextTick(() => { // 此处传入一个 done 函数
      expect(wrapper.vm.item.completed).to.equal(true)
      done()
    })
  })

  it('删除 todo 单项事件 - destroyItem', () => {
    const wrapper = mount(ContentItem, {
      propsData: {
        item: {
          id: 0,
          content: 'Test Content',
          completed: false,
          isDeleted: false
        },
        checkStatu: true
      }
    })
    const button = wrapper.find('button')

    button.trigger('click')

    expect(wrapper.emitted().refreshItems[0].length).to.equal(1)
  })
})
