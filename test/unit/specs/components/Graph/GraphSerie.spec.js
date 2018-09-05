import GraphSerie from '@/components/Graph/GraphSerie'
import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/Modal/Modal'

const mockAllParameters = [
  {
    displayName: 'param1'
  }, {
    displayName: 'param2'
  }
]

describe('GraphSerie.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(GraphSerie, {
      provide: {
        getParameters: function () {
          return mockAllParameters
        }
      },
      propsData: {
        serie: {}
      }
    })
  })

  it('Mounted correctly', async () => {
    expect(wrapper.vm.allParameters).toEqual(mockAllParameters)
    expect(wrapper.vm.serie.selectedParameter).toEqual(mockAllParameters[0])
    expect(wrapper.vm.showModal).toBe(true)
  })

  it('On modal close', () => {
    expect(wrapper.vm.showModal).toBe(true)
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.vm.showModal).toBe(false)
    expect(wrapper.emitted().edited).toBeTruthy()
  })

  it('On edit', () => {
    wrapper.find(Modal).vm.$emit('close')
    expect(wrapper.vm.showModal).toBe(false)
    wrapper.find('.btn-secondary').trigger('click')
    expect(wrapper.vm.showModal).toBe(true)
  })

  it('On remove', () => {
    wrapper.vm.remove()
    expect(wrapper.vm.showModal).toBe(false)
    expect(wrapper.emitted().remove).toBeTruthy()
  })
})
