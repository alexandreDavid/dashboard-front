import ReportedSelection from '@/components/Map/OverMap/OverMapControl/Managing/ReportedSelection/ReportedSelection'
import { mount } from '@vue/test-utils'

const mockSelectedReportedLayer = {
  paramName: 'paramName'
}

function getSelectedReportedLayer () {
  return mockSelectedReportedLayer
}

describe('ReportedSelection.vue', () => {
  it('Created without displayedReportedLayer', () => {
    const wrapper = mount(ReportedSelection, {
      provide: {
        getSelectedReportedLayer: function () {
          return false
        }
      }
    })
    expect(wrapper.vm.reportedParameters.length).toBe(1)
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.activeParam).toBeFalsy()
  })

  it('Created with displayedReportedLayer', () => {
    const wrapper = mount(ReportedSelection, {
      provide: {
        getSelectedReportedLayer: getSelectedReportedLayer
      }
    })
    expect(wrapper.vm.reportedParameters.length).toBe(1)
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.activeParam).toBe(mockSelectedReportedLayer.paramName)
  })

  it('On select a parameter', () => {
    const wrapper = mount(ReportedSelection, {
      provide: {
        getSelectedReportedLayer: function () {
          return false
        }
      }
    })

    const firstParam = wrapper.findAll('.list-group-item').at(0)
    firstParam.trigger('click')

    expect(wrapper.vm.activeParam).toBe('paramName')
    expect(wrapper.emitted().selectedReportedParameter).toEqual([[wrapper.vm.getParams()[0]]])
    expect(firstParam.classes()).toContain('active')
  })

  it('On click on info', () => {
    const wrapper = mount(ReportedSelection, {
      provide: {
        getSelectedReportedLayer: getSelectedReportedLayer
      }
    })

    const firstParam = wrapper.findAll('.list-group-item').at(0)
    expect(firstParam.find('.displayed-infos').isVisible()).toBe(false)
    firstParam.find('.display-infos').trigger('click')
    expect(firstParam.find('.displayed-infos').isVisible()).toBe(true)
  })
})
