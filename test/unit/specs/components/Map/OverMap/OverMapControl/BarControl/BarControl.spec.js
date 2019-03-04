import BarControl from '@/components/Map/OverMap/OverMapControl/BarControl/BarControl'
import { mount } from '@vue/test-utils'

const mockMap = {
  _zoom: 5,
  getMaxZoom: function () {
    return 10
  },
  getMinZoom: function () {
    return 1
  },
  on: jest.fn(),
  options: {
    zoomDelta: 1
  },
  zoomOut: jest.fn(),
  zoomIn: jest.fn(),
  setDefaultMap: jest.fn(),
  setCurrentLocationLayer: jest.fn().mockReturnValue(Promise.resolve(true)),
  zoomToCurrentLocation: jest.fn()
}

function getMapMock () {
  return function () {
    return mockMap
  }
}

const mockAreaLayer = {
  zoomToArea: jest.fn()
}
function getAreaLayer () {
  return function () {
    return mockAreaLayer
  }
}

describe('BarControl.vue', () => {
  beforeEach(() => {
    mockMap.zoomIn.mockClear()
    mockMap.zoomOut.mockClear()
  })

  it('Click on zoomIn', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click')
    expect(wrapper.vm.map.zoomIn).toBeCalledWith(1)
  })

  it('Click on zoomIn and shiftKey', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click', {shiftKey: true})
    expect(wrapper.vm.map.zoomIn).toBeCalledWith(3)
  })

  it('Click on zoomOut', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click')
    expect(wrapper.vm.map.zoomOut).toBeCalledWith(1)
  })

  it('Click on zoomOut and shiftKey', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click', {shiftKey: true})
    expect(wrapper.vm.map.zoomOut).toBeCalledWith(3)
  })

  it('Click on zoomIn but disabled', () => {
    mockMap._zoom = 10
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click')
    expect(wrapper.vm.map.zoomIn).not.toBeCalled()
  })

  it('Click on zoomOut but disabled', () => {
    mockMap._zoom = 1
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click')
    expect(wrapper.vm.map.zoomOut).not.toBeCalled()
  })

  it('Click on zoom-to-area', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    const buttonZoomToArea = wrapper.find('#zoom-to-area')
    buttonZoomToArea.trigger('click')
    expect(mockAreaLayer.zoomToArea).toBeCalled()
  })

  it('Has current location', async () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(),
        getAreaLayer: getAreaLayer()
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.hasCurrentLocation).toBe(true)
    const buttonLocation = wrapper.find('#zoom-current-location')
    expect(buttonLocation.exists()).toBeDefined()

    buttonLocation.trigger('click')
    expect(mockMap.zoomToCurrentLocation).toBeCalled()
  })

  it('Hasn\'t current location', async () => {
    mockMap.setCurrentLocationLayer.mockReturnValue(Promise.resolve(false))
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock()
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.hasCurrentLocation).toBe(false)
    expect(wrapper.find('#zoom-current-location').exists()).toBe(false)
  })
})
