import { shallowMount } from '@vue/test-utils'
import EditDataField from '@/components/Dashboard/EditWidget/EditDataField'

import GeoResourcesGroups from '@/store/geoResourcesGroups'
import GeoResources from '@/store/geoResources'

jest.mock('@/store/geoResourcesGroups', () => ({
  getAllGroups: jest.fn()
}))
const mockGetAllGroups = [{
  id: 1,
  label: 'group1'
}]
GeoResourcesGroups.getAllGroups.mockReturnValue(Promise.resolve(mockGetAllGroups))

jest.mock('@/store/geoResources', () => ({
  getAll: jest.fn()
}))
const mockGetAll = [{
  id: 1,
  label: 'resource1',
  groups: [1],
  removedProperty: 'removedProperty'
}, {
  id: 2,
  label: 'resource2',
  groups: [1],
  removedProperty: 'removedProperty'
}, {
  id: 3,
  label: 'resource3',
  groups: [2],
  removedProperty: 'removedProperty'
}]
GeoResources.getAll.mockReturnValue(mockGetAll)

describe('EditDataField.vue', () => {
  it('Mount without filter', async () => {
    const wrapper = shallowMount(EditDataField)
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('option').length).toBe(2)
  })

  it('Mount with filter', async () => {
    const wrapper = shallowMount(EditDataField, {
      propsData: {
        filter: r => r.label.includes('1')
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('option').length).toBe(1)
  })

  it('Select value', async () => {
    const wrapper = shallowMount(EditDataField)
    await wrapper.vm.$nextTick()
    wrapper.vm.valueModel = {
      id: 1,
      label: 'resource1'
    }
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
