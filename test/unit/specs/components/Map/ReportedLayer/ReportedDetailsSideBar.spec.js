import ReportedDetailsSideBar from '@/components/Map/ReportedLayer/ReportedDetailsSideBar'
import { mount } from '@vue/test-utils'
import SideBar from '@/components/SideBar/SideBar'

describe('ReportedDetailsSideBar.vue', () => {
  it('Click on close', () => {
    const wrapper = mount(ReportedDetailsSideBar, {
      propsData: { reportedDetails: true }
    })
    wrapper.find(SideBar).vm.$emit('close')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
