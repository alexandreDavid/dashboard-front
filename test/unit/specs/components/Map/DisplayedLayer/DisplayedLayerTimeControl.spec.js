import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'
import { shallowMount } from '@vue/test-utils'

describe('DisplayedLayerTimeControl.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(DisplayedLayerTimeControl, {
      propsData: {
        parameter: {
          hasTimeFrame: true,
          type: 'interval',
          times: [],
          activeTime: 'activeTime'
        }
      }
    })
  })

  it('Mounted correctly without model', () => {
    expect(wrapper.find('.dropdown-menu').exists()).toBe(false)
    wrapper.find('.dropdown-toggle').trigger('click')
    expect(wrapper.find('.dropdown-menu').exists()).toBe(true)
  })

  it('Mounted correctly with model', () => {
  })

  it('On changeSelectedModel as interval in', () => {
    // const now = Date.now() / 1000
    // const mockModel = {
    //   type: 'interval',
    //   layer: 'layer',
    //   times: [
    //     {endTime: now - 2},
    //     {endTime: now - 1},
    //     {endTime: now},
    //     {endTime: now + 1},
    //     {endTime: now + 2}
    //   ]
    // }
    // wrapper.vm.changeSelectedModel(mockModel)
    // expect(wrapper.vm.activeModel).toEqual(mockModel)
  })

  it('On changeSelectedModel as interval out', () => {
    // const now = Date.now() / 1000
    // const mockModel = {
    //   type: 'interval',
    //   layer: 'layer',
    //   times: [
    //     {endTime: now - 4},
    //     {endTime: now - 3},
    //     {endTime: now - 2},
    //     {endTime: now - 1}
    //   ]
    // }
    // wrapper.vm.changeSelectedModel(mockModel)
    // expect(wrapper.vm.activeModel).toEqual(mockModel)
  })

  it('On changeSelectedModel as date', () => {
    // const mockModel = {
    //   type: 'date',
    //   layer: 'layer',
    //   times: ['time1', 'time2', 'lasttime']
    // }
    // wrapper.vm.changeSelectedModel(mockModel)
    // expect(wrapper.vm.activeModel).toEqual(mockModel)
  })

  it('On changeSelectedModel as no valid type', () => {
    // const mockModel = {
    //   layer: 'layer',
    //   type: 'novalid',
    //   times: ['time1', 'time2', 'lasttime']
    // }
    // wrapper.vm.changeSelectedModel(mockModel)
    // expect(wrapper.vm.activeModel).toEqual(mockModel)
  })

  it('On time serie changes', () => {
    // wrapper.find(TimeSerie).vm.$emit('change', 'change')
    // expect(wrapper.emitted().timeChange).toEqual(['change'])
  })

  it('On parameter changes', () => {
    // wrapper.setProps({
    //   parameter: {}
    // })

    // wrapper.setProps({
    //   parameter: {
    //     hasTimeFrame: true,
    //     layer: 'layer',
    //     type: 'type',
    //     times: []
    //   }
    // })
  })
})
