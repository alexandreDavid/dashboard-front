import App from '@/App'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

import Api from '@/store/api'
import Area from '@/store/area'
import UserConfiguration from '@/store/userConfiguration'
import Settings from '@/store/settings'

jest.mock('@/store/api', () => ({
  getInitialEnvironmemt: jest.fn()
}))

jest.mock('@/store/area', () => ({
  setSelectedArea: jest.fn()
}))

jest.mock('@/store/userConfiguration', () => ({
  getArea: jest.fn()
}))

Api.getInitialEnvironmemt.mockReturnValue(Promise.resolve())

jest.mock('@/store/settings', () => ({
  init: jest.fn()
}))

const mockArea = 'mockArea'
UserConfiguration.getArea.mockReturnValue(mockArea)

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
    // const wrapper = shallowMount(App, {
    //   router,
    //   localVue
    // })
    // expect(wrapper.vm.isLoading).toBe(true)
    // await wrapper.vm.$nextTick()
    // await wrapper.vm.$nextTick()
    // expect(Api.getInitialEnvironmemt).toHaveBeenCalledTimes(1)
    // expect(UserConfiguration.getArea).toHaveBeenCalledTimes(1)
    // expect(Settings.init).toHaveBeenCalledTimes(1)
    // expect(Area.setSelectedArea).toHaveBeenCalledWith(mockArea)
    // expect(wrapper.vm.isLoading).toBe(false)
  })
})
