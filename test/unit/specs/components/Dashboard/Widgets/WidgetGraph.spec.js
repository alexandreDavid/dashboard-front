import { shallowMount } from '@vue/test-utils'
import WidgetGraph from '@/components/Dashboard/Widgets/WidgetGraph'

describe('WidgetMap.vue', () => {
  it('Without parameter load graph', async () => {
    const wrapper = shallowMount(WidgetGraph, {
      propsData: {
        parameter: false
      },
      stubs: { Graph: '<div class="stubbed" />' }
    })
    expect(wrapper.find('.stubbed').exists()).toBe(false)
  })

  it('With parameter load graph', async () => {
    const wrapper = shallowMount(WidgetGraph, {
      propsData: {
        parameter: true
      },
      stubs: { Graph: '<div class="stubbed" />' }
    })
    expect(wrapper.find('.stubbed').exists()).toBe(true)
  })
})
