import Router from '@/router'
import Auth from '@/store/authentication'

const mockNext = jest.fn()

jest.mock('@/store/authentication', () => ({
  isAuthenticated: jest.fn(),
  handleAuthentication: jest.fn()
}))

describe('router.js', () => {
  it('Calls init', () => {
    expect(Router.options.routes.length).toBe(8)
  })

  it('checkAuth without authentication', () => {
    Router.options.routes[0].beforeEnter()
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(1)
    expect(Auth.handleAuthentication).toHaveBeenCalledTimes(1)
  })

  it('checkAuth with authentication', () => {
    Auth.isAuthenticated.mockReturnValue(true)
    Router.options.routes[0].beforeEnter(false, false, mockNext)
    expect(Auth.isAuthenticated).toHaveBeenCalledTimes(2)
    expect(Auth.handleAuthentication).toHaveBeenCalledTimes(1)
    expect(mockNext).toHaveBeenCalledTimes(1)
  })
})
