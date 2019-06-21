import AdminPage from '@/components/Admin/AdminPage'
import { shallowMount } from '@vue/test-utils'
import Organisation from '@/api/organisation'
import User from '@/api/user'

jest.mock('@/api/organisation', () => ({
  getOrganisation: jest.fn(),
  getOrganisationUsers: jest.fn()
}))

jest.mock('@/api/user', () => ({
  isSuperAdmin: jest.fn()
}))

jest.mock('@/api/users', () => ({
  getAllUsersCsv: jest.fn(),
  setRole: jest.fn()
}))

describe('AdminPage.vue', () => {
  beforeEach(() => {
    Organisation.getOrganisation.mockClear()
    Organisation.getOrganisationUsers.mockClear()
    User.isSuperAdmin.mockClear()
  })
  it('On create', async () => {
    let wrapper = shallowMount(AdminPage)
    await wrapper.vm.$nextTick()
    expect(Organisation.getOrganisation).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(Organisation.getOrganisationUsers).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(User.isSuperAdmin).toBeCalled()
  })

  it('On create as super admin', async () => {
    let wrapper = shallowMount(AdminPage)
    await wrapper.vm.$nextTick()
    expect(Organisation.getOrganisation).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(Organisation.getOrganisationUsers).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(User.isSuperAdmin).toBeCalled()
  })
})
