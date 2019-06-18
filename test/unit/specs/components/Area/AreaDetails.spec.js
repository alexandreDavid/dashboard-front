import AreaDetails from '@/components/Area/AreaDetails'
import { shallowMount } from '@vue/test-utils'
import MapObj from '@/store/map'
import AreaLayer from '@/store/areaLayer'

// MapObj mock
const mockMapObj = {
  remove: jest.fn()
}
jest.mock('@/store/map', () => {
  return jest.fn().mockImplementation(() => {
    return mockMapObj
  })
})

// AreaLayer mock
const mockAreaLayer = {
  setSelectedArea: jest.fn()
}
jest.mock('@/store/areaLayer', () => {
  return jest.fn().mockImplementation(() => {
    return mockAreaLayer
  })
})

// const mockValue = 'mockValue'
// const mockEditedValue = 'mockEditedValue'

// function goToEdit () {
//   const wrapper = shallowMount(AreaNameInput, {
//     propsData: {
//       value: mockValue
//     }
//   })
//   expect(wrapper.vm.editing).toBe(false)

//   // Click on edit
//   wrapper.find('.edit').trigger('click')
//   expect(wrapper.vm.editing).toBe(true)
//   expect(wrapper.vm.val).toBe(mockValue)

//   return wrapper
// }

describe('AreaDetails.vue', () => {
  it('On mount with editing', () => {
    const wrapper = shallowMount(AreaDetails, {
      propsData: {
        value: {}
      }
    })
    expect(wrapper.vm.isEditing).toBe(true)
  })

  it('On mount without editing', async () => {
    const mockValue = { name: 'name' }
    const wrapper = shallowMount(AreaDetails, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.isEditing).toBe(false)
    await wrapper.vm.$nextTick()
    expect(MapObj).toBeCalledWith('area-map')
    expect(AreaLayer).toBeCalledWith(mockMapObj)
    expect(mockAreaLayer.setSelectedArea).toBeCalledWith(mockValue)
  })

  it('On click on edit', async () => {
    const mockValue = { name: 'name' }
    const wrapper = shallowMount(AreaDetails, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.isEditing).toBe(false)
    await wrapper.vm.$nextTick()

    wrapper.find('.edit').trigger('click')

    expect(wrapper.vm.isEditing).toBe(true)
    expect(mockMapObj.remove).toBeCalled()
    expect(wrapper.vm.map).toBe(false)
    expect(wrapper.vm.areaLayer).toBe(false)
  })

  it('Click on validate', async () => {
    const mockValue = { type: 'type', valid: true }
    const wrapper = shallowMount(AreaDetails, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.vm.valueModel).toBe(mockValue)
    await wrapper.vm.$nextTick()

    wrapper.find('.validate').trigger('click')
    expect(wrapper.emitted('input')[0]).toEqual([ mockValue ])
  })

  it('On click on cancel and remove map', async () => {
    const mockValue = { name: 'name', type: 'type', id: 'id' }
    const wrapper = shallowMount(AreaDetails, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.isEditing).toBe(false)
    await wrapper.vm.$nextTick()

    wrapper.find('.edit').trigger('click')

    expect(wrapper.vm.isEditing).toBe(true)
    expect(wrapper.vm.valueModel).toBe(mockValue)
    await wrapper.vm.$nextTick()

    wrapper.find('.cancel').trigger('click')
    expect(wrapper.vm.isEditing).toBe(false)
    expect(mockMapObj.remove).toBeCalled()
  })
})
