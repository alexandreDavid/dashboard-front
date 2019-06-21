import Login from '@/components/Login/Login'
import { shallowMount } from '@vue/test-utils'

import auth from '@/store/authentication'
import organisationApi from '@/api/organisation'

jest.mock('@/store/authentication', () => ({
  login: jest.fn(),
  signUp: jest.fn(),
  forgotPassword: jest.fn()
}))

jest.mock('@/api/organisation', () => ({
  getOrganisationByHash: jest.fn()
}))

describe('Login.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Login)
  })

  it('On create with hash', async () => {
    const mockOrga = { name: 'mockOrga' }
    organisationApi.getOrganisationByHash.mockReturnValue(mockOrga)
    let wrapper = shallowMount(Login, {
      propsData: {
        hash: 'hash'
      }
    })
    await wrapper.vm.$nextTick()
    expect(organisationApi.getOrganisationByHash).toBeCalledWith('hash')
    expect(wrapper.vm.organisation).toBe(mockOrga.name)
  })

  it('On create with error', () => {
    let wrapper = shallowMount(Login, {
      propsData: {
        error: 'error'
      }
    })
    expect(wrapper.vm.messageError).toBe('error')
  })

  it('On click on login success', async () => {
    const mockLogin = 'mockLogin'
    auth.login.mockReturnValue(mockLogin)
    wrapper.find('#login-form').trigger('submit.prevent')
    expect(auth.login).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.message).toBe(mockLogin)
  })

  // it('On click on login error', async () => {
  //   const mockLogin = 'mockLogin'
  //   auth.login.mockRejectedValueOnce(new Error(mockLogin))
  //   wrapper.find('#login-form').trigger('submit.prevent')
  //   expect(auth.login).toBeCalled()
  //   await wrapper.vm.$nextTick()
  //   expect(wrapper.vm.messageError).toBe(mockLogin)
  // })
})
