import DashboardPage from '@/components/Dashboard/DashboardPage.vue'
import Parameter from '@/store/parameter'
import Area from '@/store/area'
import Api from '@/store/api'
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import { shallowMount } from '@vue/test-utils'
// import flushPromises from 'flush-promises'
jest.mock('@/store/parameter', () => ({
  getAllParameters: jest.fn(),
  getParams: jest.fn()
}))
jest.mock('@/store/area', () => ({
  getSelectedArea: jest.fn()
}))
jest.mock('@/store/api', () => ({
  setDashboard: jest.fn()
}))

describe('DashboardPage.vue', () => {
  beforeEach(() => {
    Parameter.getAllParameters.mockClear()
    Parameter.getAllParameters.mockReturnValue(Promise.resolve([]))
    Parameter.getParams.mockClear()
    Parameter.getParams.mockReturnValue([{id: 'test'}])
    Area.getSelectedArea.mockClear()
    Area.getSelectedArea.mockReturnValue({})
    Api.setDashboard.mockClear()
  })

  it('has a created hook', () => {
    expect(typeof DashboardPage.created).toBe('function')
  })

  it('correctly sets the values when created', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('Calls addCard when click on button', async () => {
    Area.getSelectedArea.mockReturnValue({})
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.isEditing).toBe(true)

    const button = wrapper.find('#add-card')

    // when
    button.trigger('click')

    // then
    expect(wrapper.vm.dashboard.cards.length).toBe(1)
  })

  it('Calls toggle editing mode', async () => {
    Api.setDashboard.mockReturnValue()
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.isEditing).toBe(true)

    const buttonSave = wrapper.find('.save')
    buttonSave.trigger('click')
    expect(wrapper.vm.isEditing).toBe(false)

    const buttonEdit = wrapper.find('.edit')
    buttonEdit.trigger('click')
    expect(wrapper.vm.isEditing).toBe(true)
  })

  it('Remove card when @delete', async () => {
    Area.getSelectedArea.mockReturnValue({})
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)
    expect(wrapper.vm.isEditing).toBe(true)

    const button = wrapper.find('#add-card')

    // when
    button.trigger('click')

    // then
    expect(wrapper.vm.dashboard.cards.length).toBe(1)

    wrapper.find(DashboardCardModal).vm.$emit('delete')
    expect(wrapper.vm.dashboard.cards.length).toBe(0)
  })
})
