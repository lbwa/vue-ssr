import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import LayoutContent from '@/components/LayoutContent'

describe('LayoutContent.vue', () => {
  // addTodoItem
  it('Input box 文字输入事件 - addTodoItem', () => {
    const wrapper = mount(LayoutContent)
    const vm = wrapper.vm
    const inputBox = wrapper.find('.add-item')

    // vue-test-utils 不能设置事件目标 evt.target 作为载荷
    // https://vue-test-utils.vuejs.org/zh-cn/api/wrapper/trigger.html
    inputBox.element.value = 'Test text'
    inputBox.trigger('keyup.enter')

    expect(vm.items[0].id).to.equal(0)
    expect(vm.items[0].content).to.contain('Test text')
    expect(vm.items[0].completed).to.equal(false)
    expect(vm.items[0].isDeleted).to.equal(false)
    expect(vm.filteredItems.length).to.not.equal(0) // 界面显示的条目

    // input box 输入为空时，跳过添加
    vm.items = []
    inputBox.element.value = ''
    inputBox.trigger('keyup.enter')

    expect(vm.items.length).to.equal(0)
  })

  /**
   * 1. link: http://slides.com/mattoconnell/deck#/12
   * 2. 单元测试应注重接口，界面的测试，而不是测试具体的数据实现，这也是单元测试的最终
   * 极的目的，这是关注组件的展现结果，而不是实现过程，是为后期的拓展带来了更大扩展性。
   * 3. 据以上原理，故不再测试 LayoutContent 中的 ContentItem 等子组件的渲染，这部分
   * 测试在各自子组件测试配置中进行
   */

  it('刷新显示的 todo 单项 - refreshItems', () => {
    const wrapper = mount(LayoutContent)
    const inputBox = wrapper.find('.add-item')

    inputBox.element.value = 'Test content'
    inputBox.trigger('keyup.enter')

    expect(wrapper.vm.items.length).to.equal(1)

    // 模拟监听器被触发
    wrapper.vm.refreshItems(wrapper.vm.items[0])
    expect(wrapper.vm.items.length).to.equal(0)
  })

  it('用户切换底部标签 - refreshSelect and filteredItems', () => {
    const wrapper = mount(LayoutContent)

    wrapper.vm.refreshSelect('completed')
    expect(wrapper.vm.hasSelected).to.equal('completed')
  })

  it('过滤 hasCompleted 显示 - filteredItems', () => {
    const wrapper = mount(LayoutContent)
    wrapper.setData({
      items: [{
        id: 0,
        content: 'Test content',
        completed: true,
        isDeleted: false
      }],
      hasSelected: 'completed'
    })
  })

  it('处理用户点击 todo 单项的行为 - refreshItemCompleted', () => {
    const wrapper = mount(LayoutContent)
    wrapper.setData({
      items: [{
        id: 0,
        content: 'Test content',
        completed: false,
        isDeleted: true
      }]
    })

    wrapper.vm.refreshItemCompleted(wrapper.vm.items[0])
    expect(wrapper.vm.items[0].completed).to.equal(true)
  })

  it('用户点击清除所有已完成的 todo 单项 - clearCompleted ', done => {
    // done() 是  Mocha 测试框架自带的判断异步过程的函数
    // https://vue-test-utils.vuejs.org/zh-cn/guides/testing-async-components.html
    const wrapper = mount(LayoutContent)
    wrapper.setData({
      items: [{
        id: 0,
        content: 'Test content',
        completed: true,
        isDeleted: false
      }]
    })

    wrapper.vm.clearCompleted()

    expect(wrapper.vm.items.length).to.equal(0)
    expect(wrapper.vm.completedText).to.equal('Done !')
    setTimeout(() => {
      expect(wrapper.vm.completedText).to.equal('Clear Completed')
      done()
    }, 1100) // 设置 1100ms 是应为原组件中设置了 1000 ms 延迟

    // 测试 if (!this.timer) { clearTimeout(this.timer) }
    wrapper.vm.clearCompleted()
  })
})
