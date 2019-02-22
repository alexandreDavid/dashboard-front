import ProfileList from '@/components/NavBar/ProfileList'
import { shallowMount } from '@vue/test-utils'

import Authentication from '@/store/authentication'

jest.mock('@/store/authentication', () => ({
  logout: jest.fn()
}))

const $router = []
const $tours = {
  GlobalTour: {
    start: jest.fn()
  }
}

describe('ProfileList.vue', () => {
  it('Click on settings', () => {
    const wrapper = shallowMount(ProfileList)
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.find('.settings').trigger('click')
    expect(wrapper.emitted().openSideBar[0]).toEqual(['settings'])
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
  })

  it('Click on about', () => {
    const wrapper = shallowMount(ProfileList)
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.find('.about').trigger('click')
    expect(wrapper.emitted().openSideBar[0]).toEqual(['about'])
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
  })

  it('Click on help', () => {
    const wrapper = shallowMount(ProfileList, {
      mocks: {
        $router,
        $tours
      }
    })
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.find('.help').trigger('click')
    expect(wrapper.vm.$tours.GlobalTour.start).toBeCalled()
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
  })

  it('Click on sign out', () => {
    const wrapper = shallowMount(ProfileList)
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.find('.sign-out').trigger('click')
    expect(Authentication.logout).toBeCalled()
  })

  it('Emit event on click on click outside', () => {
    const wrapper = shallowMount(ProfileList)
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.vm.handleClickOutside({})
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
  })

  it('Not emit event on click on click inside', () => {
    const wrapper = shallowMount(ProfileList)
    expect(wrapper.vm.displayDropDownMenu).toBe(false)
    wrapper.find('a.nav-link').trigger('click')
    expect(wrapper.vm.displayDropDownMenu).toBe(true)

    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.vm.displayDropDownMenu).toBe(true)
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    const wrapper = shallowMount(ProfileList)

    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
