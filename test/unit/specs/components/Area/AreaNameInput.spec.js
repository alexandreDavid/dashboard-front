import AreaNameInput from '@/components/Area/AreaNameInput'
import { shallowMount } from '@vue/test-utils'

const mockValue = 'mockValue'
const mockEditedValue = 'mockEditedValue'

function goToEdit () {
  const wrapper = shallowMount(AreaNameInput, {
    propsData: {
      value: mockValue
    }
  })
  expect(wrapper.vm.editing).toBe(false)

  // Click on edit
  wrapper.find('.edit').trigger('click')
  expect(wrapper.vm.editing).toBe(true)
  expect(wrapper.vm.val).toBe(mockValue)

  return wrapper
}

describe('AreaNameInput.vue', () => {
  it('mounted with value', () => {
    const wrapper = shallowMount(AreaNameInput, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.editing).toBe(false)
    expect(wrapper.vm.val).toBe(mockValue)
  })

  it('mounted without value', () => {
    const wrapper = shallowMount(AreaNameInput)
    expect(wrapper.vm.editing).toBe(true)
  })

  it('Value changes from external', () => {
    const wrapper = shallowMount(AreaNameInput, {
      propsData: {
        value: mockValue
      }
    })
    expect(wrapper.vm.editing).toBe(false)
    expect(wrapper.vm.val).toBe(mockValue)

    wrapper.setProps({ value: mockEditedValue })
    expect(wrapper.vm.editing).toBe(false)
    expect(wrapper.vm.val).toBe(mockEditedValue)

    wrapper.setProps({ value: false })
    expect(wrapper.vm.editing).toBe(true)
    expect(wrapper.vm.val).toBe(false)
  })

  it('Click on edit', async () => {
    const wrapper = goToEdit()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$refs.input).toBe(document.activeElement)
  })

  it('Click on cancel', () => {
    const wrapper = goToEdit()

    // Editing
    wrapper.vm.val = mockEditedValue
    expect(wrapper.vm.val).toBe(mockEditedValue)

    // Click on cancel
    wrapper.find('.cancel').trigger('click')
    expect(wrapper.vm.val).toBe(mockValue)
  })

  it('Click on validate', () => {
    const wrapper = goToEdit()

    // Editing
    wrapper.vm.val = mockEditedValue
    expect(wrapper.vm.val).toBe(mockEditedValue)

    // Click on validate
    wrapper.find('.validate').trigger('click')
    expect(wrapper.vm.editing).toBe(false)
    expect(wrapper.emitted().input[0]).toEqual([mockEditedValue])
  })
})
