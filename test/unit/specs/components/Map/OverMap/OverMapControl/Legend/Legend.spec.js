import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import { shallowMount } from '@vue/test-utils'
import { LegendGradient, LegendDiscrete } from '@/components/Map/OverMap/OverMapControl/Legend/type'

describe('Legend.vue', () => {
  it('Gradient legend', () => {
    let wrapper = shallowMount(Legend, {
      propsData: {
        legend: {
          type: 'gradient'
        }
      }
    })
    expect(wrapper.find('.legend-type').is(LegendGradient)).toBe(true)
  })

  it('Discrete legend', () => {
    let wrapper = shallowMount(Legend, {
      propsData: {
        legend: {
          type: 'discrete'
        }
      }
    })
    expect(wrapper.find('.legend-type').is(LegendDiscrete)).toBe(true)
  })
})
