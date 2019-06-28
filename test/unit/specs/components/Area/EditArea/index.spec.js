import EditArea from '@/components/Area/EditArea'
import { shallowMount } from '@vue/test-utils'
import EditCustomArea from '@/components/Area/EditArea/EditCustomArea'

describe('EditArea/index.vue', () => {
  it('On mount without value', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: {}
      }
    })
    expect(wrapper.vm.isNew).toBe(true)
  })

  it('On mount force new', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: { id: 'id' },
        forceNew: true
      }
    })
    expect(wrapper.vm.isNew).toBe(true)
  })

  it('On mount not new', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: { id: 'id' }
      }
    })
    expect(wrapper.vm.isNew).toBe(false)
  })

  it('On switch type', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: { id: 'id', name: 'name' }
      }
    })
    wrapper.vm.switchType()
    expect(wrapper.vm.valueModel.name).toBe('')
  })

  it('On value changes', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: { id: 'id' }
      }
    })
    wrapper.setProps({value: {}})
    expect(wrapper.vm.isNew).toBe(true)
  })

  it('On model value changes', () => {
    const wrapper = shallowMount(EditArea, {
      propsData: {
        value: { id: 'id', type: 'custom' }
      }
    })
    const newModel = { name: 'newModel' }
    wrapper.find(EditCustomArea).vm.$emit('input', newModel)
    expect(wrapper.emitted().input[0]).toEqual([ newModel ])
  })
})
