import Profile from '@/components/Profile'
import { shallowMount } from '@vue/test-utils'

describe('Profile.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Profile, {
      mocks: {
        $router: {
          currentRoute: {
            name: '$router-currentRoute-name'
          }
        }
      },
      stubs: ['router-view']
    })
  })

  it('On init', () => {
    expect(wrapper.findAll('.list-group-item').length).toBe(5)
  })
})
