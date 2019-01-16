import DashboardPage from '@/components/Dashboard/DashboardPage.vue'
import Api from '@/store/api'
import UserConfiguration from '@/store/userConfiguration'
import DashboardCardModal from '@/components/Dashboard/DashboardCardModal'
import AreaSelectionControl from '@/components/Area/AreaSelectionControl'
import { shallowMount } from '@vue/test-utils'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/geoResources', () => ({
  getAll: jest.fn(),
  getAllResources: jest.fn()
}))

jest.mock('@/store/api', () => ({
  setDashboard: jest.fn()
}))

jest.mock('@/store/userConfiguration', () => ({
  getDashboard: jest.fn(),
  setDashboard: jest.fn()
}))

const mockScrollBy = jest.fn()
document.querySelector = jest.fn().mockReturnValue({
  scrollBy: mockScrollBy
})

describe('DashboardPage.vue', () => {
  beforeEach(() => {
    GeoResources.getAll.mockReturnValue([
      {
        id: 1,
        displayName: 'displayName1',
        config: {
          statistics: true
        }
      }, {
        id: 2,
        displayName: 'displayName1',
        config: {
          statistics: true
        }
      }
    ])
    GeoResources.getAllResources.mockReturnValue(Promise.resolve([]))
    Api.setDashboard.mockClear()
    UserConfiguration.getDashboard.mockReturnValue({title: 'title', cards: []})
  })

  it('has a created hook', () => {
    expect(typeof DashboardPage.created).toBe('function')
  })

  it('correctly sets the values when created', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(UserConfiguration.getDashboard).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isLoaded).toBe(true)
  })

  it('Calls addCard when click on button', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    wrapper.find(AreaSelectionControl).vm.$emit('change', true)
    expect(wrapper.vm.isLoaded).toBe(true)

    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.isEditing).toBe(true)

    const button = wrapper.find('#add-card')
    button.trigger('click')

    // then
    expect(wrapper.vm.dashboard.cards.length).toBe(1)
  })

  it('Calls toggle editing mode', async () => {
    Api.setDashboard.mockReturnValue()
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoaded).toBe(true)

    const buttonEdit = wrapper.find('.edit')
    buttonEdit.trigger('click')
    expect(wrapper.vm.isEditing).toBe(true)

    const buttonSave = wrapper.find('.save')
    buttonSave.trigger('click')
    expect(wrapper.vm.isEditing).toBe(false)
  })

  it('SearchLocation input emit', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    const inputValue = {}
    wrapper.find(AreaSelectionControl).vm.$emit('change', inputValue)
    expect(wrapper.vm.selectedArea).toBe(inputValue)
  })

  it('Close modal when emit @close', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    wrapper.find(AreaSelectionControl).vm.$emit('change', true)
    expect(wrapper.vm.isLoaded).toBe(true)
    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.vm.showCardModal).toBe(false)

    const button = wrapper.find('#add-card')
    button.trigger('click')
    expect(wrapper.vm.showCardModal).toBe(true)

    wrapper.find(DashboardCardModal).vm.$emit('close')
    expect(wrapper.vm.showCardModal).toBe(false)
  })

  it('Remove card when @delete', async () => {
    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    wrapper.find(AreaSelectionControl).vm.$emit('change', true)
    expect(wrapper.vm.isLoaded).toBe(true)
    wrapper.find('.edit').trigger('click')
    expect(wrapper.vm.isEditing).toBe(true)

    const button = wrapper.find('#add-card')

    // when
    button.trigger('click')

    // then
    expect(wrapper.vm.dashboard.cards.length).toBe(1)
    expect(mockScrollBy).toBeCalled()

    wrapper.find(DashboardCardModal).vm.$emit('delete')
    expect(wrapper.vm.dashboard.cards.length).toBe(0)
  })
})
