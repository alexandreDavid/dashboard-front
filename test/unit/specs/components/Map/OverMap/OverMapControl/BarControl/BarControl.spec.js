import BarControl from '@/components/Map/OverMap/OverMapControl/BarControl/BarControl'
import { mount } from '@vue/test-utils'

function getMapMock (curZoom = 5, maxZoom = 10, minZoom = 1) {
  return function () {
    return {
      _zoom: curZoom,
      getMaxZoom: function () {
        return maxZoom
      },
      getMinZoom: function () {
        return minZoom
      },
      on: jest.fn(),
      options: {
        zoomDelta: 1
      },
      zoomOut: jest.fn(),
      zoomIn: jest.fn(),
      setDefaultMap: jest.fn()
    }
  }
}

describe('BarControl.vue', () => {
  it('Click on zoomIn', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock()
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click')
    expect(wrapper.vm.map.zoomIn).toBeCalledWith(1)
  })

  it('Click on zoomIn and shiftKey', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock()
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click', {shiftKey: true})
    expect(wrapper.vm.map.zoomIn).toBeCalledWith(3)
  })

  it('Click on zoomOut', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock()
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click')
    expect(wrapper.vm.map.zoomOut).toBeCalledWith(1)
  })

  it('Click on zoomOut and shiftKey', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock()
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click', {shiftKey: true})
    expect(wrapper.vm.map.zoomOut).toBeCalledWith(3)
  })

  it('Click on zoomIn but disabled', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(10)
      }
    })
    const button = wrapper.find('#zoom-in')
    button.trigger('click')
    expect(wrapper.vm.map.zoomIn).not.toBeCalled()
  })

  it('Click on zoomOut but disabled', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(1)
      }
    })
    const button = wrapper.find('#zoom-out')
    button.trigger('click')
    expect(wrapper.vm.map.zoomOut).not.toBeCalled()
  })

  it('Click on go-to-global', () => {
    const wrapper = mount(BarControl, {
      provide: {
        getMap: getMapMock(1)
      }
    })
    const buttonResetMap = wrapper.find('#go-to-global')
    buttonResetMap.trigger('click')
    expect(wrapper.vm.map.setDefaultMap).toBeCalled()
  })
})
