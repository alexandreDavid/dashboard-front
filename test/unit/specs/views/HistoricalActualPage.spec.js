import HistoricalActualPage from '@/views/HistoricalActualPage'
import { shallowMount } from '@vue/test-utils'

describe('HistoricalActualPage.vue', () => {
  it('on create', () => {
    let wrapper = shallowMount(HistoricalActualPage, {
      propsData: {
        variable: {
          startDate: 2010,
          endDate: 2018,
          layerName: 'layerName'
        },
        period: 'period'
      }
    })
    expect(wrapper.vm.lastDisplayedYear).toBe(2013)
    expect(wrapper.vm.allMiniMaps.length).toBe(5)
    expect(wrapper.vm.activeMiniMap).toBe(2018)
  })

  it('on select year', () => {
    let wrapper = shallowMount(HistoricalActualPage, {
      propsData: {
        variable: {
          startDate: 2010,
          endDate: 2018,
          layerName: 'layerName'
        },
        period: 'period'
      }
    })
    expect(wrapper.vm.activeMiniMap).toEqual(2018)
    wrapper.vm.selectYear({title: 2015})
    expect(wrapper.vm.activeMiniMap).toBe(2015)
    expect(wrapper.emitted().change).toEqual([[2015]])
  })

  it('on variable change', () => {
    let wrapper = shallowMount(HistoricalActualPage, {
      propsData: {
        variable: {
          startDate: 2010,
          endDate: 2018,
          layerName: 'layerName'
        },
        period: 'period'
      }
    })
    wrapper.setProps({variable: {
      startDate: 2010,
      endDate: 2012,
      layerName: 'layerName'
    }})
    expect(wrapper.vm.lastDisplayedYear).toBe(2009)
    expect(wrapper.vm.allMiniMaps.length).toBe(3)
    expect(wrapper.vm.activeMiniMap).toEqual(2012)
  })

  it('on period change', () => {
    let wrapper = shallowMount(HistoricalActualPage, {
      propsData: {
        variable: {
          startDate: 2010,
          endDate: 2018,
          layerName: 'layerName'
        },
        period: 'period'
      }
    })
    wrapper.vm.allMiniMaps = [{
      title: 'title1',
      param: {
        layerParameters: {}
      }
    }, {
      title: 'title2',
      param: {
        layerParameters: {}
      }
    }]
    wrapper.setProps({period: 'april'})
    expect(wrapper.vm.allMiniMaps[0].param.layerParameters.time).toBe('title1-april')
    expect(wrapper.vm.allMiniMaps[1].param.layerParameters.time).toBe('title2-april')
  })
})
