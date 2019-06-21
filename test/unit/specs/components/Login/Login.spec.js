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

  it('On click on signup check modal', () => {
    expect(wrapper.vm.showLicenseAgreement).toBe(false)
    wrapper.find('#signup-type-other').setChecked()
    wrapper.find('#signup-form').trigger('submit.prevent')
    expect(wrapper.vm.showLicenseAgreement).toBe(true)
  })

  it('On click on signup success', async () => {
    wrapper.find('#signup-type-government').setChecked()
    wrapper.find('#signup-form').trigger('submit.prevent')
    expect(auth.signUp).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.connectTab).toBe('login')
  })

  it('On click on signup success', async () => {
    const mockLogin = 'mockLogin'
    auth.forgotPassword.mockReturnValue(mockLogin)
    wrapper.find('#reset-form').trigger('submit.prevent')
    expect(auth.forgotPassword).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.message).toBe(mockLogin)
  })
})
