import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import { mount } from '@vue/test-utils'
import Unit from '@/utils/unit'

jest.mock('@/utils/unit', () => ({
  convert: jest.fn().mockReturnValue(42),
  getUnitsFamily: jest.fn().mockReturnValue([
    {
      key: 'key1',
      label: 'label1'
    }, {
      key: 'key2',
      label: 'label2'
    }
  ])
}))

const mockDisplayedLayer = {
  setUnit: jest.fn()
}
function getDisplayedLayer () {
  return mockDisplayedLayer
}

describe('Legend.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Legend, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      }
    })
  })

  it('Check init', async () => {
    expect(wrapper.vm.gradientColor).toBe('linear-gradient(rgba(44, 123, 182, 0.5), rgba(171, 217, 233, 0.5), rgba(255, 255, 191, 0.5), rgba(253, 174, 97, 0.5), rgba(215, 25, 28, 0.5))')
  })

  it('On change active unit', () => {
    const buttons = wrapper.findAll('.btn')
    buttons.at(0).trigger('click')
    expect(buttons.at(0).classes()).toContain('active')
    expect(wrapper.vm.activeUnit).toBe('key1')
    expect(Unit.convert).toHaveBeenCalledTimes(wrapper.vm.displayedValues.length)

    buttons.at(1).trigger('click')
    expect(buttons.at(1).classes()).toContain('active')
    expect(wrapper.vm.activeUnit).toBe('key2')
    expect(Unit.convert).toHaveBeenCalledTimes(wrapper.vm.displayedValues.length * 2)
  })
})
