import DashboardPage from '@/components/Dashboard/DashboardPage.vue'
import { shallowMount } from '@vue/test-utils'

import Dashboards from '@/store/dashboards'
import DashboardTemplates from '@/store/dashboardTemplates'
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

jest.mock('@/store/dashboardTemplates', () => ({
  getStarterDashboard: jest.fn()
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
    const mockAddDashboard = 'addDashboard'
    Dashboards.addDashboard.mockReturnValue(mockAddDashboard)
    const mockStarterDashboard = 'getStarterDashboard'
    DashboardTemplates.getStarterDashboard.mockReturnValue(mockStarterDashboard)

    const wrapper = shallowMount(DashboardPage)
    await wrapper.vm.$nextTick()
    expect(GeoResources.getAllResources).toBeCalled()
    expect(Dashboards.getAll).toBeCalled()
    expect(DashboardTemplates.getStarterDashboard).toBeCalled()
    expect(Dashboards.addDashboard).toBeCalledWith(mockStarterDashboard)
    expect(wrapper.vm.selectedDashboard).toEqual(mockAddDashboard)
    expect(wrapper.vm.isLoaded).toBe(true)
  })
})
