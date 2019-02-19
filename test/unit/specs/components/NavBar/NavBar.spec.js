import NavBar from '@/components/NavBar/NavBar.vue'
import ProfileAboutSidebar from '@/components/NavBar/ProfileAboutSidebar.vue'
import ProfileList from '@/components/NavBar/ProfileList'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [{
    path: '/dashboard',
    name: 'dashboard',
    component: {}
  }, {
    path: '/map',
    name: 'map'
  }, {
    path: '/graph',
    name: 'graph'
  }, {
    path: '/historical',
    name: 'historical'
  }, {
    path: '/future-climate',
    name: 'future-climate'
  }, {
    path: '/questionnaire',
    name: 'questionnaire'
  }, {
    path: '/support',
    name: 'support'
  }]
})

function verifyClickGoTo (name) {
  expect(typeof NavBar.data).toBe('function')
  const wrapper = shallowMount(NavBar, {
    localVue,
    router
  })
  expect(wrapper.vm.$route).toBeInstanceOf(Object)

  const button = wrapper.find(`#nav-${name} a`)
  button.trigger('click')
  expect(wrapper.vm.activeNavItem).toBe(name)
}

async function verifyClickOpenSideBar (name) {
  const wrapper = shallowMount(NavBar, {
    localVue,
    router,
    stubs: {
      ProfileAboutSidebar: ProfileAboutSidebar
    }
  })

  // const button = wrapper.find(`#nav-${name} a`)
  // button.trigger('click')
  wrapper.find(ProfileList).vm.$emit('openSideBar', name)
  expect(wrapper.vm.sideBarTab).toBe(name)
  expect(wrapper.vm.showSidebar).toBe(true)

  // await wrapper.vm.$nextTick()
  wrapper.find(ProfileAboutSidebar).vm.$emit('close')
  expect(wrapper.vm.showSidebar).toBe(false)
}

describe('NavBar.vue', () => {
  it('Click on dashboard', () => {
    verifyClickGoTo('dashboard')
  })

  it('Click on map', () => {
    verifyClickGoTo('map')
  })

  it('Click on historical', () => {
    verifyClickGoTo('historical')
  })

  // it('Click on future-climate', () => {
  //   verifyClickGoTo('future-climate')
  // })

  it('Click on profile and toggle sidebar', async () => {
    await verifyClickOpenSideBar('settings')
  })

  it('Click on about and toggle sidebar', async () => {
    await verifyClickOpenSideBar('about')
  })
})
