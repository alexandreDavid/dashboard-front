import AccountPage from '@/components/Profile/AccountPage'
import { shallowMount } from '@vue/test-utils'

import auth from '@/store/authentication'
import ConfirmModal from '@/components/Modal/ConfirmModal'

jest.mock('@/store/authentication', () => ({
  deleteUser: jest.fn()
}))

describe('AccountPage.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AccountPage)
  })

  it('On click and close', () => {
    expect(wrapper.find(ConfirmModal).exists()).toBe(false)
    wrapper.find('button').trigger('click')
    expect(wrapper.find(ConfirmModal).exists()).toBe(true)
    wrapper.find(ConfirmModal).vm.$emit('close')
    expect(wrapper.find(ConfirmModal).exists()).toBe(false)
  })

  it('On click and confirm', () => {
    expect(wrapper.find(ConfirmModal).exists()).toBe(false)
    wrapper.find('button').trigger('click')
    expect(wrapper.find(ConfirmModal).exists()).toBe(true)
    wrapper.find(ConfirmModal).vm.$emit('confirm')
    expect(auth.deleteUser).toBeCalled()
  })
})
