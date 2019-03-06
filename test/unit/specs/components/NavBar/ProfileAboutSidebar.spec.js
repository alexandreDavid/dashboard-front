import ProfileAboutSidebar from '@/components/NavBar/ProfileAboutSidebar.vue'
import { shallowMount } from '@vue/test-utils'
import SideBar from '@/components/SideBar/SideBar'

jest.mock('@/store/authentication', () => ({
  logout: jest.fn()
}))

describe('ProfileAboutSidebar.vue', () => {
  it('Click on nav tab profile', () => {
    const wrapper = shallowMount(ProfileAboutSidebar)
    const button = wrapper.find('#nav-item-settings a')
    button.trigger('click')
    expect(wrapper.vm.selectedTab).toBe('settings')
  })

  it('Click on nav tab about', () => {
    const wrapper = shallowMount(ProfileAboutSidebar)
    const button = wrapper.find('#nav-item-about a')
    button.trigger('click')
    expect(wrapper.vm.selectedTab).toBe('about')
  })

  it('Click on close', () => {
    const wrapper = shallowMount(ProfileAboutSidebar)
    wrapper.find(SideBar).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
