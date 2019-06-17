// api/user.spec.js

import User from '@/api/user'

const mockSecuredInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/user.js', () => {
  beforeEach(() => {
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.post.mockClear()
    mockSecuredInstance.put.mockClear()
    mockSecuredInstance.delete.mockClear()
  })

  it('Call getUser', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await User.getUser()
    expect(mockSecuredInstance.get).toBeCalledWith('/user')
    expect(result).toBe(mockData)
  })

  it('Call setUser', async () => {
    const mockData = 'mockData'
    const user = 'user'
    mockSecuredInstance.put.mockResolvedValue({data: mockData})
    const result = await User.setUser(user)
    expect(mockSecuredInstance.put).toBeCalledWith('/user', user)
    expect(result).toBe(mockData)
  })

  it('Call login', async () => {
    const mockData = 'mockData'
    const username = 'username'
    const password = 'password'
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await User.login(username, password)
    expect(mockSecuredInstance.post).toBeCalledWith('/user/login', { username, password })
    expect(result).toBe(mockData)
  })

  it('Call login reject generic error', async () => {
    const username = 'username'
    const password = 'password'
    mockSecuredInstance.post.mockRejectedValue({})
    expect.assertions(2)
    try {
      await User.login(username, password)
    } catch (e) {
      expect(e).toBe('Something went wrong')
    }
    expect(mockSecuredInstance.post).toBeCalledWith('/user/login', { username, password })
  })

  it('Call login reject with message', async () => {
    const username = 'username'
    const password = 'password'
    mockSecuredInstance.post.mockRejectedValue({
      response: {
        data: {
          message: 'message',
          policy: 'policy'
        }
      }
    })
    expect.assertions(2)
    try {
      await User.login(username, password)
    } catch (e) {
      expect(e).toBe('message policy')
    }
    expect(mockSecuredInstance.post).toBeCalledWith('/user/login', { username, password })
  })

  it('Call login reject with description', async () => {
    const username = 'username'
    const password = 'password'
    mockSecuredInstance.post.mockRejectedValue({
      response: {
        data: {
          description: 'description'
        }
      }
    })
    expect.assertions(2)
    try {
      await User.login(username, password)
    } catch (e) {
      expect(e).toBe('description')
    }
    expect(mockSecuredInstance.post).toBeCalledWith('/user/login', { username, password })
  })

  it('Call login reject without message', async () => {
    const username = 'username'
    const password = 'password'
    mockSecuredInstance.post.mockRejectedValue({
      response: {
        data: {}
      }
    })
    expect.assertions(2)
    try {
      await User.login(username, password)
    } catch (e) {
      expect(e).toBe('Something went wrong')
    }
    expect(mockSecuredInstance.post).toBeCalledWith('/user/login', { username, password })
  })

  it('Call forgotPassword with email', async () => {
    const mockData = 'mockData'
    const email = 'email'
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await User.forgotPassword(email)
    expect(mockSecuredInstance.post).toBeCalledWith('/user/forgot_password', { email })
    expect(result).toBe(mockData)
  })

  it('Call forgotPassword without email', async () => {
    const mockData = 'mockData'
    const email = 'email'
    mockSecuredInstance.get.mockResolvedValue({ data: { email } })
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await User.forgotPassword()
    expect(mockSecuredInstance.get).toBeCalledWith('/user')
    expect(mockSecuredInstance.post).toBeCalledWith('/user/forgot_password', { email })
    expect(result).toBe(mockData)
  })

  it('Call changePassword', async () => {
    const mockData = 'mockData'
    const current = 'current'
    const password = 'password'
    const passwordConfirmation = 'passwordConfirmation'
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await User.changePassword(current, password, passwordConfirmation)
    expect(mockSecuredInstance.post).toBeCalledWith('/user/change_password', { current, password, passwordConfirmation })
    expect(result).toBe(mockData)
  })

  it('Call signup', async () => {
    const mockData = 'mockData'
    const email = 'curemailrent'
    const password = 'password'
    const metadata = 'metadata'
    const hash = 'hash'
    mockSecuredInstance.post.mockResolvedValue({data: mockData})
    const result = await User.signup(email, password, metadata, hash)
    expect(mockSecuredInstance.post).toBeCalledWith('/user/signup', { email, password, metadata, hash })
    expect(result).toBe(mockData)
  })

  it('Call isAdmin', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await User.isAdmin()
    expect(mockSecuredInstance.get).toBeCalledWith('/user/is_admin')
    expect(result).toBe(mockData)
  })

  it('Call isAdmin rejected', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await User.isAdmin()
    expect(mockSecuredInstance.get).toBeCalledWith('/user/is_admin')
    expect(result).toBe(false)
  })

  it('Call isSuperAdmin', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await User.isSuperAdmin()
    expect(mockSecuredInstance.get).toBeCalledWith('/user/is_super_admin')
    expect(result).toBe(mockData)
  })

  it('Call isSuperAdmin rejected', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await User.isSuperAdmin()
    expect(mockSecuredInstance.get).toBeCalledWith('/user/is_super_admin')
    expect(result).toBe(false)
  })

  it('Call deleteUser', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.delete.mockResolvedValue({data: mockData})
    const result = await User.deleteUser()
    expect(mockSecuredInstance.delete).toBeCalledWith('/user')
    expect(result).toBe(mockData)
  })
})
