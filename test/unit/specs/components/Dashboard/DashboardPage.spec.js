import DashboardPage from '@/components/Dashboard/DashboardPage.vue'
import { shallowMount } from '@vue/test-utils'

import Dashboards from '@/store/dashboards'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/geoResources', () => ({
  getAllResources: jest.fn()
}))

jest.mock('@/store/dashboards', () => ({
  getAll: jest.fn(),
  addDashboard: jest.fn(),
  removeDashboard: jest.fn(),
  setAll: jest.fn()
}))

describe('DashboardPage.vue', () => {
  beforeEach(() => {
    GeoResources.getAllResources.mockReturnValue(Promise.resolve([
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
    ]))
  })

  it('Create without dashboard', async () => {
    Dashboards.getAll.mockReturnValue([])
    Dashboards.addDashboard.mockReturnValue('addDashboard')

    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(Dashboards.addDashboard).toBeCalledWith(wrapper.vm.getDefaultDashboard())
    expect(wrapper.vm.selectedDashboards).toEqual(['addDashboard'])
    expect(wrapper.vm.isLoaded).toBe(true)
  })
})
