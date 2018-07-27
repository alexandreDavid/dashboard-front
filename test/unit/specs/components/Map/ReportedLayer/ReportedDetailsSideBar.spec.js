import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'
import { shallowMount } from '@vue/test-utils'
import SideBar from '@/components/SideBar/SideBar'

describe('ReportedDetailsSideBar.vue', () => {
  it('Click on close', () => {
    const wrapper = shallowMount(ReportedDetailsSideBar, {
      propsData: { reportedDetails: {
        station: {
          name: 'name'
        },
        timeseries: []
      } }
    })
    wrapper.find(SideBar).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
