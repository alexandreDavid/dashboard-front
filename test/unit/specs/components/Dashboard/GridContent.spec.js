import GridContent from '@/components/Dashboard/GridContent'
import { shallowMount } from '@vue/test-utils'

describe('GridContent.vue', () => {
  it('On sortBy', async () => {
    let wrapper = shallowMount(GridContent, {
      propsData: {
        lines: [
          { col1: 'line1', col2: 'line1' },
          { col1: 'line2', col2: 'line2' }
        ],
        columns: ['col1', 'col2'],
        filterKey: 'col1',
        editable: true,
        sortable: true
      }
    })
    wrapper.vm.sortBy('col2')
  })
})
