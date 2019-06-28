import Router from '@/router'
import Auth from '@/store/authentication'

jest.mock('@/store/authentication', () => ({
  isAuthenticated: jest.fn(),
  handleAuthentication: jest.fn(),
  logout: jest.fn()
}))

jest.mock('@/components/Dashboard/DashboardPage', () => ({
  isAuthenticated: jest.fn(),
  handleAuthentication: jest.fn()
}))

describe('router.js', () => {
  beforeEach(() => {
    Auth.isAuthenticated.mockClear()
    Auth.logout.mockClear()
  })

  it('Calls init', () => {
    expect(Router.options.routes.length).toBe(4)
  })

  it('Token with authentication', () => {
    const mockNext = jest.fn()
    Auth.isAuthenticated.mockReturnValue(true)
    Router.options.routes[0].beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(mockNext).toHaveBeenCalledWith('/')
  })

  it('Token without authentication', () => {
    const mockNext = jest.fn()
    Auth.isAuthenticated.mockReturnValue(false)
    Router.options.routes[0].beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(mockNext).toHaveBeenCalledWith()
  })

  it('CheckAuth with authentication', async () => {
    const mockNext = jest.fn()
    Auth.isAuthenticated.mockReturnValue(true)
    await Router.options.routes[1].beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(mockNext).toHaveBeenCalled()
  })

  it('CheckAuth without authentication', async () => {
    const mockNext = jest.fn()
    Auth.isAuthenticated.mockReturnValue(false)
    await Router.options.routes.find(r => r.path === '/').beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(Auth.logout).toHaveBeenCalledTimes(1)
    expect(mockNext).not.toHaveBeenCalled()
  })

  it('CheckAuth error', async () => {
    const mockNext = jest.fn()
    Auth.isAuthenticated.mockImplementation(() => {
      throw new Error()
    })
    await Router.options.routes.find(r => r.path === '/').beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(Auth.logout).toHaveBeenCalled()
    expect(mockNext).not.toHaveBeenCalled()
  })
})
