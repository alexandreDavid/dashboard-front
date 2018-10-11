import DisplayedLayerTimeControl from '@/components/Map/DisplayedLayer/DisplayedLayerTimeControl'
import { shallowMount } from '@vue/test-utils'
import TimeSerie from '@/components/Map/OverMap/OverMapControl/TimeSerie/TimeSerie'

const mockDisplayedLayer = {
  setDisplayedLayer: jest.fn(),
  setTime: jest.fn(),
  formatTime: jest.fn()
}
function getDisplayedLayer () {
  return mockDisplayedLayer
}

describe('DisplayedLayerTimeControl.vue', () => {
  let wrapper
  beforeEach(() => {
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    wrapper = shallowMount(DisplayedLayerTimeControl, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      },
      propsData: {
        parameter: {
          hasTimeFrame: true,
          layer: 'layer',
          type: 'type',
          times: []
        }
      }
    })
  })

  it('Mounted correctly without model', () => {
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    shallowMount(DisplayedLayerTimeControl, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      },
      propsData: {
        parameter: {
          type: 'type',
          times: []
        }
      }
    })
    expect(mockDisplayedLayer.setDisplayedLayer).not.toBeCalled()
  })

  it('Mounted correctly with model', () => {
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })

  it('On changeSelectedModel as interval in', () => {
    const now = Date.now() / 1000
    const mockModel = {
      type: 'interval',
      times: [
        {endTime: now - 2},
        {endTime: now - 1},
        {endTime: now},
        {endTime: now + 1},
        {endTime: now + 2}
      ]
    }
    wrapper.vm.changeSelectedModel(mockModel)
    expect(wrapper.vm.activeModel).toEqual(mockModel)
    expect(mockDisplayedLayer.formatTime).toBeCalledWith({endTime: now + 1})
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })

  it('On changeSelectedModel as interval out', () => {
    const now = Date.now() / 1000
    const mockModel = {
      type: 'interval',
      times: [
        {endTime: now - 4},
        {endTime: now - 3},
        {endTime: now - 2},
        {endTime: now - 1}
      ]
    }
    wrapper.vm.changeSelectedModel(mockModel)
    expect(wrapper.vm.activeModel).toEqual(mockModel)
    expect(mockDisplayedLayer.formatTime).toBeCalledWith({endTime: now - 4})
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })

  it('On changeSelectedModel as date', () => {
    const mockModel = {
      type: 'date',
      times: ['time1', 'time2', 'lasttime']
    }
    wrapper.vm.changeSelectedModel(mockModel)
    expect(wrapper.vm.activeModel).toEqual(mockModel)
    expect(mockDisplayedLayer.formatTime).toBeCalledWith('lasttime')
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })

  it('On changeSelectedModel as no valid type', () => {
    mockDisplayedLayer.formatTime.mockClear()
    const mockModel = {
      type: 'novalid',
      times: ['time1', 'time2', 'lasttime']
    }
    wrapper.vm.changeSelectedModel(mockModel)
    expect(wrapper.vm.activeModel).toEqual(mockModel)
    expect(mockDisplayedLayer.formatTime).not.toBeCalled()
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })

  it('On time serie changes', () => {
    wrapper.find(TimeSerie).vm.$emit('change', 'change')
    expect(mockDisplayedLayer.setTime).toBeCalledWith('change')
  })

  it('On parameter changes', () => {
    mockDisplayedLayer.setDisplayedLayer.mockClear()
    wrapper.setProps({
      parameter: {}
    })
    expect(mockDisplayedLayer.setDisplayedLayer).not.toBeCalled()

    wrapper.setProps({
      parameter: {
        hasTimeFrame: true,
        layer: 'layer',
        type: 'type',
        times: []
      }
    })
    expect(mockDisplayedLayer.setDisplayedLayer).toBeCalled()
  })
})
