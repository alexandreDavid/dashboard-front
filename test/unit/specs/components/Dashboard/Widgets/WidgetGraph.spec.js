import { shallowMount } from '@vue/test-utils'
import WidgetGraph from '@/components/Dashboard/Widgets/WidgetGraph'

describe('WidgetGraph.vue', () => {
  it('Without config load graph', async () => {
    const wrapper = shallowMount(WidgetGraph, {
      propsData: {
        config: false
      },
      stubs: { Graph: '<div class="stubbed" />' }
    })
    expect(wrapper.find('.stubbed').exists()).toBe(false)
  })

  it('With parameter load graph', async () => {
    const wrapper = shallowMount(WidgetGraph, {
      propsData: {
        config: true
      },
      stubs: { Graph: '<div class="stubbed" />' }
    })
    expect(wrapper.find('.stubbed').exists()).toBe(false)
  })
})
