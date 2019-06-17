// updates/dashboards.spec.js

import Dashboards from '@/updates/dashboards'
import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/userConfiguration', () => ({
  getDashboards: jest.fn(),
  removeDashboards: jest.fn()
}))

describe('updates/dashboards.js', () => {
  beforeEach(() => {
    UserConfiguration.getDashboards.mockClear()
    UserConfiguration.removeDashboards.mockClear()
  })

  it('Call with dashboards', async () => {
    const store = {
      state: {
        dashboards: {
          all: ['ok']
        }
      },
      dispatch: jest.fn()
    }
    await Dashboards(store)

    expect(UserConfiguration.getDashboards).not.toBeCalled()
    expect(UserConfiguration.removeDashboards).toBeCalled()
  })

  it('Call without dashboards', async () => {
    const firstDashboard = 'firstDashboard'
    const secondDashboard = 'secondDashboard'
    const store = {
      state: {
        dashboards: {
          all: []
        }
      },
      dispatch: jest.fn()
    }
    UserConfiguration.getDashboards.mockReturnValue([ firstDashboard, secondDashboard ])
    await Dashboards(store)

    expect(UserConfiguration.getDashboards).toBeCalled()
    expect(store.dispatch).toBeCalledWith('dashboards/setDashboard', firstDashboard)
    expect(store.dispatch).toBeCalledWith('dashboards/setDashboard', secondDashboard)
    expect(UserConfiguration.removeDashboards).toBeCalled()
  })
})
