import ReportedSelection from '@/components/Map/OverMap/OverMapControl/Managing/ReportedSelection/ReportedSelection'
import { mount } from '@vue/test-utils'

const mockSelectedReportedLayer = {
  name: 'name'
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
    expect(wrapper.vm.activeParam).toBe(mockSelectedReportedLayer.name)
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

    const selectedParam = wrapper.vm.getParams()[0]
    expect(wrapper.vm.activeParam).toBe(selectedParam.name)
    expect(wrapper.emitted().selectedReportedParameter).toEqual([[selectedParam]])
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
