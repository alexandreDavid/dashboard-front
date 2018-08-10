import Managing from '@/components/Map/OverMap/OverMapControl/Managing/Managing'
import { mount, shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'
import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import ReportedSelection from '@/components/Map/OverMap/OverMapControl/Managing/ReportedSelection/ReportedSelection'
import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'

const mockMap = {
  on: jest.fn().mockImplementation((evtName, callback) => {
    mockMap[evtName] = callback
  })
}

function getMapMock () {
  return function () {
    return mockMap
  }
}

jest.mock('@/store/parameter', () => ({
  getDisplayedParameter: jest.fn().mockReturnValue('getDisplayedParameter')
}))

describe('Managing.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Managing, {
      provide: {
        getMap: getMapMock()
      }
    })
  })

  it('Mounted correctly', () => {
    expect(mockMap.on).toBeCalled()
  })

  it('Toggle ForecastSelection modal', () => {
    const buttonForecastSelection = wrapper.find('#forecast-selection-btn')
    expect(wrapper.vm.showModal).toBe(false)
    buttonForecastSelection.trigger('click')
    expect(wrapper.vm.showModal).toBe(true)

    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.vm.showModal).toBe(false)
  })

  it('Choose ForecastSelection', () => {
    const wrapper = mount(Managing, {
      provide: {
        getMap: getMapMock()
      },
      stubs: {
        ForecastSelection: true,
        ReportedSelection: true,
        Legend: true
      }
    })
    const buttonForecastSelection = wrapper.find('#forecast-selection-btn')
    buttonForecastSelection.trigger('click')
    expect(wrapper.vm.showModal).toBe(true)

    wrapper.find(ForecastSelection).vm.$emit('selectedParameter', 'selectedParameter')
    expect(wrapper.vm.showModal).toBe(false)
    expect(wrapper.emitted().selectedParameter).toEqual([['selectedParameter']])
  })

  it('On layer add', () => {
    mockMap.layeradd()
    expect(wrapper.vm.displayedParameter).toBe('getDisplayedParameter')
  })

  it('Choose ReportedSelection', () => {
    const wrapper = mount(Managing, {
      provide: {
        getMap: getMapMock()
      },
      stubs: {
        ForecastSelection: true,
        ReportedSelection: true,
        Legend: true
      }
    })
    const buttonForecastSelection = wrapper.find('#reported-selection-btn')
    buttonForecastSelection.trigger('click')
    expect(wrapper.vm.showModalReported).toBe(true)

    wrapper.find(ReportedSelection).vm.$emit('selectedReportedParameter', 'selectedReportedParameter')
    expect(wrapper.vm.showModalReported).toBe(false)
    expect(wrapper.emitted().selectedReportedParameter).toEqual([['selectedReportedParameter']])
  })
})
