import ReportedLayer from '@/components/Map/ReportedLayer/ReportedLayer'
import { shallowMount } from '@vue/test-utils'
import L from 'leaflet'
import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'

const mockCircleMarker = {
  bindTooltip: jest.fn().mockReturnThis(),
  on: jest.fn(function (evt, callback) {
    this[evt] = callback
    return this
  }),
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn()
}

L.CircleMarker = jest.fn().mockImplementation(() => mockCircleMarker)

const mockDomEvent = {
  stop: jest.fn()
}
L.DomEvent = mockDomEvent

function getMapMock () {
  return function () {
  }
}

jest.useFakeTimers()

describe('ReportedLayer.vue', () => {
  it('Initialise without selectedReportedLayer', () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      }
    })
    expect(wrapper.vm.allMarkers.length).toBe(wrapper.vm.mockStations().length)
  })

  it('Initialise with selectedReportedLayer', () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      },
      propsData: {
        selectedReportedLayer: {selectedReportedLayer: 1}
      }
    })
    expect(mockCircleMarker.remove).toHaveBeenCalledTimes(0)

    wrapper.setProps({
      selectedReportedLayer: {selectedReportedLayer: 2}
    })
    expect(mockCircleMarker.remove).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.allMarkers.length).toBe(wrapper.vm.mockStations().length)
  })

  it('Open sidebar on click circle', () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      }
    })
    const firstMarker = wrapper.vm.allMarkers[0]
    firstMarker.click()
    expect(mockDomEvent.stop).toBeCalled()
    jest.advanceTimersByTime(0)
    expect(wrapper.vm.showSideBar).toBe(true)
    expect(wrapper.vm.reportedDetails.station).toEqual(wrapper.vm.mockStations()[1].station)
  })

  it('Close sidebar on emit event', () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      }
    })
    wrapper.vm.openSideBar()
    expect(wrapper.vm.showSideBar).toBe(true)
    wrapper.find(ReportedDetailsSideBar).vm.$emit('close')
    expect(wrapper.vm.showSideBar).toBe(false)
  })
})
