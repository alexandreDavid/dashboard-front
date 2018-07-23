import SettingsPage from '@/components/Settings/SettingsPage'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/dashboard',
    name: 'dashboard'
  }]
})

describe('SettingsPage.vue', () => {
  it('Click on close without redirect', () => {
    const wrapper = shallowMount(SettingsPage, {
      localVue, router
    })
    expect(wrapper.vm.$route).toBeDefined()

    const button = wrapper.find('.close')
    button.trigger('click')
    expect(wrapper.vm.$route.fullPath).toBe('/')
  })

  it('Click on close with redirect', () => {
    const router = new VueRouter({
      routes: [{
        path: '/dashboard',
        name: 'dashboard'
      }, {
        path: '*',
        redirect: { name: 'dashboard' }
      }]
    })
    const wrapper = shallowMount(SettingsPage, {
      localVue, router
    })
    expect(wrapper.vm.$route).toBeDefined()

    const button = wrapper.find('.close')
    button.trigger('click')
    expect(wrapper.vm.$route.fullPath).toBe('/dashboard')
  })
})
