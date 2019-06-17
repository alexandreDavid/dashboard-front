// api/organisation.spec.js

import Organisation from '@/api/organisation'

const mockSecuredInstance = {
  get: jest.fn(),
  put: jest.fn()
}

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => mockSecuredInstance)
})

describe('api/organisation.js', () => {
  beforeEach(() => {
    mockSecuredInstance.get.mockClear()
    mockSecuredInstance.put.mockClear()
  })

  it('Call getOrganisation', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Organisation.getOrganisation()
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation')
    expect(result).toBe(mockData)
  })

  it('Call getOrganisation reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Organisation.getOrganisation()
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation')
    expect(result).toBe(false)
  })

  it('Call getOrganisationByHash', async () => {
    const mockData = 'mockData'
    const hash = 'hash'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Organisation.getOrganisationByHash(hash)
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation/hash/hash')
    expect(result).toBe(mockData)
  })

  it('Call getOrganisationByHash reject', async () => {
    const hash = 'hash'
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Organisation.getOrganisationByHash(hash)
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation/hash/hash')
    expect(result).toBe(false)
  })

  it('Call setOrganisation', async () => {
    const mockData = 'mockData'
    const organisationObj = { id: 'idUpdateObj' }
    mockSecuredInstance.put.mockResolvedValue({data: mockData})
    const result = await Organisation.setOrganisation(organisationObj)
    expect(mockSecuredInstance.put).toBeCalledWith('/organisation', organisationObj)
    expect(result).toBe(mockData)
  })

  it('Call setOrganisation reject', async () => {
    const organisationObj = { id: 'idUpdateObj' }
    mockSecuredInstance.put.mockRejectedValue()
    const result = await Organisation.setOrganisation(organisationObj)
    expect(mockSecuredInstance.put).toBeCalledWith('/organisation', organisationObj)
    expect(result).toBe(false)
  })

  it('Call getOrganisationUsers', async () => {
    const mockData = 'mockData'
    mockSecuredInstance.get.mockResolvedValue({data: mockData})
    const result = await Organisation.getOrganisationUsers()
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation/users')
    expect(result).toBe(mockData)
  })

  it('Call getActive reject', async () => {
    mockSecuredInstance.get.mockRejectedValue()
    const result = await Organisation.getOrganisationUsers()
    expect(mockSecuredInstance.get).toBeCalledWith('/organisation/users')
    expect(result).toBe(false)
  })
})
