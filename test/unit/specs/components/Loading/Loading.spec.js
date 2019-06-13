import { shallowMount } from '@vue/test-utils'
import Loading from '@/components/Loading/Loading'

describe('Loading.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper.find('.text-center div').text()).toBe('Loading...')
  })
})
