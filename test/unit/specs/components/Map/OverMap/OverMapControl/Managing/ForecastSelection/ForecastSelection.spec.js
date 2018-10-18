import ForecastSelection from '@/components/Map/OverMap/OverMapControl/Managing/ForecastSelection/ForecastSelection'
import { mount } from '@vue/test-utils'
import Parameter from '@/store/parameter'

const mockAllParameters = [{
  groupingId: 1,
  paramName: 'paramName1',
  displayName: 'displayName1',
  unit: 'unit'
}, {
  groupingId: 1,
  paramName: 'paramName2',
  displayName: 'displayName2'
}, {
  groupingId: 2,
  paramName: 'paramName3',
  displayName: 'displayName3'
}]
const mockAllParametersGroupings = [{
  groupingId: 1,
  displayName: 'displayName1'
}, {
  groupingId: 2,
  displayName: 'displayName2'
}]

jest.mock('@/store/parameter', () => ({
  getAllParameters: jest.fn(),
  getAllParameterGroupings: jest.fn()
}))

Parameter.getAllParameters.mockReturnValue(Promise.resolve(mockAllParameters))
Parameter.getAllParameterGroupings.mockReturnValue(Promise.resolve(mockAllParametersGroupings))

describe('ForecastSelection.vue', () => {
  it('Created without activeParam', async () => {
    const wrapper = mount(ForecastSelection)
    await wrapper.vm.$nextTick()
    expect(Parameter.getAllParameters).toBeCalled()
    expect(Parameter.getAllParameterGroupings).toBeCalled()
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.activeParam).toBeFalsy()
  })

  it('Created with activeParam', async () => {
    const wrapper = mount(ForecastSelection)
    await wrapper.vm.$nextTick()
    expect(Parameter.getAllParameters).toBeCalled()
    expect(Parameter.getAllParameterGroupings).toBeCalled()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  function openFirstGroup (groupsCard) {
    expect(groupsCard.length).toBe(mockAllParametersGroupings.length)
    const group2Open = groupsCard.at(0)
    const groupHeader = group2Open.find('.card-header')
    expect(groupHeader.text()).toBe('displayName1 2')

    const groupList = group2Open.find('.list-group')
    expect(groupList.isVisible()).toBe(false)
    groupHeader.trigger('click')
    expect(groupList.isVisible()).toBe(true)
    return group2Open
  }

  it('On click on group', async () => {
    const wrapper = mount(ForecastSelection)
    await wrapper.vm.$nextTick()
    const groupsCard = wrapper.findAll('.card')
    const groupCard = openFirstGroup(groupsCard)
    expect(wrapper.vm.openedGroup).toBe(1)

    // Close group
    expect(groupCard.find('.list-group').isVisible()).toBe(true)
    groupCard.find('.card-header').trigger('click')
    expect(groupCard.find('.list-group').isVisible()).toBe(false)
    expect(wrapper.vm.openedGroup).toBe(false)
  })

  it('On select a parameter', async () => {
    const wrapper = mount(ForecastSelection)
    await wrapper.vm.$nextTick()
    const groupCard = openFirstGroup(wrapper.findAll('.card'))

    const firstParam = groupCard.findAll('.list-group-item').at(0)
    firstParam.trigger('click')

    expect(wrapper.emitted().selectedParameter).toEqual([[mockAllParameters[0]]])
    expect(firstParam.classes()).toContain('active')
  })

  it('On click on info', async () => {
    const wrapper = mount(ForecastSelection)
    await wrapper.vm.$nextTick()
    const groupCard = openFirstGroup(wrapper.findAll('.card'))

    const firstParam = groupCard.findAll('.list-group-item').at(0)
    expect(firstParam.find('.displayed-infos').isVisible()).toBe(false)
    firstParam.find('.display-infos').trigger('click')
    expect(firstParam.find('.displayed-infos').isVisible()).toBe(true)
  })
})
