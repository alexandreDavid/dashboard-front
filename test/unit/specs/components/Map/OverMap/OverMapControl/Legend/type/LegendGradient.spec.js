import LegendGradient from '@/components/Map/OverMap/OverMapControl/Legend/type/LegendGradient'
import { mount } from '@vue/test-utils'

describe('LegendGradient.vue', () => {
  it('Gradient legend without range', () => {
    let wrapper = mount(LegendGradient, {
      propsData: {
        legend: {
          type: 'gradient',
          values: [
            {
              val: 0,
              name: 'val0',
              color: '#000000'
            },
            {
              val: 1,
              name: 'val1',
              color: '#FFFFFF'
            }
          ]
        }
      }
    })
    expect(wrapper.vm.getGradientColor(wrapper.vm.legend.values)).toBe('linear-gradient(to right, rgba(0, 0, 0), rgba(255, 255, 255))')
  })

  it('Gradient legend with range', () => {
    let wrapper = mount(LegendGradient, {
      propsData: {
        legend: {
          type: 'gradient',
          values: [
            {
              val: 0,
              name: 'val0',
              color: '#000000'
            },
            {
              val: 1,
              name: 'val1',
              color: '#FFFFFF'
            }
          ],
          range: {
            min: {
              val: 0.2,
              name: 'min'
            },
            max: {
              val: 0.5,
              name: 'max'
            }
          }
        }
      }
    })
    expect(wrapper.vm.getGradientColor(wrapper.vm.legend.values)).toBe('linear-gradient(to right, rgba(0, 0, 0), rgba(255, 255, 255))')
  })
})
