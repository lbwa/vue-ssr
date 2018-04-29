import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import Tabs from 'components/tabs/tabs'
import Tab from 'components/tabs/tab'

describe('Tabs.vue', () => {
  it('应该正确渲染 tabs 插槽', () => {
    // FIXME: 单元测试时，报错未注册 tabs 组件
    const wrapper = mount(Tabs, {
      propsData: {
        value: 'all'
      },

      slots: {
        default: [Tab]
      }
    })

    expect(wrapper.find('.tab').exists()).to.be.equal(true)
    // const button = wrapper.find('.active')

    // // event
    // button.trigger('click')

    // /**
    //  * wrapper.emitted() 返回如下对象:
    //  * { 事件名: [[第一次派发事件的载荷], [第二次派发事件的载荷], ...]}
    //  * 无载荷时，返回空数组
    //  */

    // /**
    //  * 1. 触发监听函数 toggleSelect() ==> 其中，this.$emit('userSelect', status)
    //  * 2. 检测数组长度，而不是内容，有更好的普适性
    //  * 3. wrapper.emitted().userSelect === [[ 'active' ]]
    //  */
    // expect(wrapper.emitted().userSelect[0].length).to.equal(1)
  })
})
