import App from '@/App'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

import Api from '@/store/api'

jest.mock('@/store/api', () => ({
  getInitialEnvironmemt: jest.fn()
}))

Api.getInitialEnvironmemt.mockReturnValue(Promise.resolve())

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/dashboard',
    name: 'dashboard'
  }, {
    path: '/map',
    name: 'map'
  }, {
    path: '/graph',
    name: 'graph'
  }]
})

describe('App.vue', () => {
  it('On init', async () => {
    const wrapper = shallowMount(App, {
      router,
      localVue
    })
    expect(wrapper.vm.isLoading).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
