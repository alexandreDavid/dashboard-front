import Legend from '@/components/Map/OverMap/OverMapControl/Legend/Legend'
import { mount } from '@vue/test-utils'
import Unit from '@/utils/unit'

const mockUnits = [
  {
    key: 'K',
    label: 'label1'
  }, {
    key: 'F',
    label: 'label2'
  }, {
    key: 'C',
    label: 'label3'
  }
]

jest.mock('@/store/settings', () => ({
  activeSettings: {
    getFamilyUnit: 'C'
  }
}))

jest.mock('@/utils/unit', () => ({
  convert: jest.fn().mockReturnValue(42),
  getUnitsFamily: jest.fn(),
  getFamilyUnit: jest.fn()
}))
Unit.getUnitsFamily.mockReturnValue(mockUnits)
Unit.getFamilyUnit.mockReturnValue('getFamilyUnit')

const mockDisplayedLayer = {
  _hasInteractiveLegend: true,
  getUnit: jest.fn(),
  setUnit: jest.fn()
}
mockDisplayedLayer.getUnit.mockReturnValue('K')

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
    Unit.convert.mockClear()
    expect(Unit.convert).toHaveBeenCalledTimes(0)
    const buttons = wrapper.findAll('.btn-group-sm .btn')
    buttons.at(0).trigger('click')
    expect(buttons.at(0).classes()).toContain('active')
    expect(wrapper.vm.activeUnit).toEqual(mockUnits[0].key)
    expect(Unit.convert).toHaveBeenCalledTimes(0)

    buttons.at(1).trigger('click')
    expect(buttons.at(1).classes()).toContain('active')
    expect(wrapper.vm.activeUnit).toEqual(mockUnits[1].key)
    expect(Unit.convert).toHaveBeenCalledTimes(wrapper.vm.displayedValues.length)
  })

  it('On click on online change unit', () => {
    Unit.convert.mockClear()
    expect(Unit.convert).toHaveBeenCalledTimes(0)
    const wrapper = mount(Legend, {
      provide: {
        getDisplayedLayer: getDisplayedLayer
      },
      propsData: {
        asline: true
      }
    })
    expect(Unit.convert).toHaveBeenCalledTimes(wrapper.vm.displayedValues.length)
    // Default unit
    expect(wrapper.vm.activeUnit).toEqual(mockUnits[2].key)
    const button = wrapper.find('.on-line .btn')
    button.trigger('click')
    expect(wrapper.vm.activeUnit).toEqual(mockUnits[0].key)
    expect(Unit.convert).toHaveBeenCalledTimes(wrapper.vm.displayedValues.length)

    button.trigger('click')
    expect(wrapper.vm.activeUnit).toEqual(mockUnits[1].key)
    expect(Unit.convert).toHaveBeenCalledTimes(2 * wrapper.vm.displayedValues.length)
  })
})
