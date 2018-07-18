import NavBar from '@/components/NavBar/NavBar.vue'
import ProfileAboutSidebar from '@/components/NavBar/ProfileAboutSidebar.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

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

function verifyClickGoTo (name) {
  expect(typeof NavBar.data).toBe('function')
  const wrapper = shallowMount(NavBar, {
    localVue,
    router
  })

  const button = wrapper.find(`#nav-${name} a`)
  button.trigger('click')
  expect(wrapper.vm.activeNavItem).toBe(name)
}

async function verifyClickOpenSideBar (name) {
  const wrapper = shallowMount(NavBar, {
    localVue,
    router
  })

  const button = wrapper.find(`#nav-${name} a`)
  button.trigger('click')
  expect(wrapper.vm.sideBarTab).toBe(name)
  expect(wrapper.vm.showSidebar).toBe(true)

  await wrapper.vm.$nextTick()
  wrapper.find(ProfileAboutSidebar).vm.$emit('close')
  expect(wrapper.vm.showSidebar).toBe(false)
}

describe('DashboardCardModal.vue', () => {
  it('Click on dashboard', () => {
    verifyClickGoTo('dashboard')
  })

  it('Click on map', () => {
    verifyClickGoTo('map')
  })

  it('Click on graph', () => {
    verifyClickGoTo('graph')
  })

  it('Click on profile and toggle sidebar', async () => {
    await verifyClickOpenSideBar('profile')
  })

  it('Click on about and toggle sidebar', async () => {
    await verifyClickOpenSideBar('about')
  })
})
