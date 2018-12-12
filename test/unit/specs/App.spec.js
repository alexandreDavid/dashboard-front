import App from '@/App'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('App.vue', () => {
  it('On init', async () => {
    const wrapper = shallowMount(App, {
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)

    expect(wrapper.find('router-view-stub').exists()).toBe(true)
  })
})
