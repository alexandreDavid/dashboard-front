import ReportedLayer from '@/components/Map/ReportedLayer/ReportedLayer'
import { shallowMount } from '@vue/test-utils'
import L from 'leaflet'
import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'
import Observation from '@/store/observation'

const mockCircleMarker = {
  bindTooltip: jest.fn().mockReturnThis(),
  on: jest.fn(function (evt, callback) {
    this[evt] = callback
    return this
  }),
  addTo: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  setStyle: jest.fn()
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

jest.mock('@/store/observation', () => ({
  getAllObservationsType: jest.fn()
}))
const mockAllObservations = [
  {
    'timeseries_data': [],
    'station_id': 'TA00207',
    'name': 'Mubende Hydromet',
    'long': 31.39055,
    'lat': 0.56302,
    'last_measurement': '2018-07-29T17:10:00.000Z',
    'first_measurement': '2017-09-07T05:15:00.000Z'
  }, {
    'timeseries_data': [],
    'station_id': 'TA00210',
    'name': 'Kasese Synoptic',
    'long': 30.10059,
    'lat': 0.18919,
    'last_measurement': '2018-08-13T08:00:00.000Z',
    'first_measurement': '2017-09-08T02:30:00.000Z'
  }
]
Observation.getAllObservationsType.mockReturnValue(Promise.resolve(mockAllObservations))

jest.useFakeTimers()

describe('ReportedLayer.vue', () => {
  it('Initialise without selectedReportedLayer', async () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      }
    })
    expect(wrapper.vm.allMarkers.length).toBe(0)
    wrapper.setProps({ selectedReportedLayer: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.allMarkers.length).toBe(mockAllObservations.length)
  })

  it('Initialise with selectedReportedLayer', async () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      },
      propsData: {
        selectedReportedLayer: {selectedReportedLayer: 1}
      }
    })
    await wrapper.vm.$nextTick()
    expect(mockCircleMarker.remove).toHaveBeenCalledTimes(0)

    wrapper.setProps({
      selectedReportedLayer: {selectedReportedLayer: 2}
    })
    await wrapper.vm.$nextTick()
    expect(mockCircleMarker.remove).toHaveBeenCalledTimes(mockAllObservations.length)
    expect(wrapper.vm.allMarkers.length).toBe(mockAllObservations.length)
  })

  it('Open sidebar on click circle', async () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      },
      propsData: {
        selectedReportedLayer: true
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.allMarkers.length).toBe(mockAllObservations.length)
    const firstMarker = wrapper.vm.allMarkers[0]
    firstMarker.click()
    expect(mockDomEvent.stop).toBeCalled()
    jest.advanceTimersByTime(0)
    expect(wrapper.vm.showSideBar).toBe(true)
    expect(wrapper.vm.reportedDetails.station).toEqual(mockAllObservations[0].station)
  })

  it('Close sidebar on emit event', async () => {
    const wrapper = shallowMount(ReportedLayer, {
      provide: {
        getMap: getMapMock()
      },
      propsData: {
        selectedReportedLayer: true
      }
    })
    await wrapper.vm.$nextTick()
    const firstMarker = wrapper.vm.allMarkers[0]
    firstMarker.click()
    jest.advanceTimersByTime(0)
    expect(wrapper.vm.showSideBar).toBe(true)
    wrapper.find(ReportedDetailsSideBar).vm.$emit('close')
    expect(wrapper.vm.showSideBar).toBe(false)
  })
})
