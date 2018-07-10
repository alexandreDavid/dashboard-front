import ProfileAboutSidebar from '@/components/NavBar/ProfileAboutSidebar.vue'
import { mount } from '@vue/test-utils'
import SideBar from '@/components/SideBar/SideBar'
import Authentication from '@/store/authentication'

jest.mock('@/store/authentication', () => ({
  logout: jest.fn()
}))

describe('ProfileAboutSidebar.vue', () => {
  it('Click on nav tab profile', () => {
    const wrapper = mount(ProfileAboutSidebar)
    const button = wrapper.find('#nav-item-profile a')
    button.trigger('click')
    expect(wrapper.vm.selectedTab).toBe('profile')
  })

  it('Click on nav tab about', () => {
    const wrapper = mount(ProfileAboutSidebar)
    const button = wrapper.find('#nav-item-about a')
    button.trigger('click')
    expect(wrapper.vm.selectedTab).toBe('about')
  })

  it('Click on close', () => {
    const wrapper = mount(ProfileAboutSidebar)
    wrapper.find(SideBar).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  it('Click on logout', async () => {
    const wrapper = mount(ProfileAboutSidebar)
    const button = wrapper.find('#user-logout')
    button.trigger('click')
    expect(Authentication.logout).toBeCalled()
  })
})
