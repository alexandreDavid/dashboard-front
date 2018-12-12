import { shallowMount } from '@vue/test-utils'
import DashboardWidget from '@/components/Dashboard/DashboardWidget.vue'
import { WidgetGraph, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'

describe('DashboardWidget.vue', () => {
  it('should render correct widget graph', () => {
    const cardConfiguration = {
      widget: {
        id: 'graph',
        formFields: [{
          id: 'parameter',
          value: ''
        }, {
          id: 'graphType',
          value: ''
        }]
      }
    }
    const selectedArea = {}
    const isEditing = false
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    expect(wrapper.is(DashboardWidget)).toBe(true)
    expect(wrapper.contains(WidgetGraph)).toBe(true)
  })

  it('should render correct widget map', () => {
    const cardConfiguration = {
      id: 'test',
      widget: {
        id: 'map',
        formFields: [{
          id: 'parameter',
          value: ''
        }, {
          id: 'graphType',
          value: ''
        }]
      }
    }
    const selectedArea = {}
    const isEditing = false
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    expect(wrapper.is(DashboardWidget)).toBe(true)
    expect(wrapper.contains(WidgetMap)).toBe(true)
  })

  it('should render correct widget table', () => {
    const cardConfiguration = {
      widget: {
        id: 'table'
      }
    }
    const selectedArea = {}
    const isEditing = false
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    expect(wrapper.is(DashboardWidget)).toBe(true)
    expect(wrapper.findAll('.widget-table')).toHaveLength(1)
    expect(wrapper.contains(WidgetTable)).toBe(true)
  })

  it('should render correct widget textarea', () => {
    const cardConfiguration = {
      widget: {
        id: 'textarea',
        formFields: [{
          id: 'text',
          value: ''
        }]
      }
    }
    const selectedArea = {}
    const isEditing = false
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    expect(wrapper.is(DashboardWidget)).toBe(true)
    expect(wrapper.contains(WidgetTextArea)).toBe(true)
  })

  it('calls editCard when click on button', () => {
    const cardConfiguration = {
      widget: {
        id: 'textarea',
        formFields: [{
          id: 'text',
          value: ''
        }]
      }
    }
    const selectedArea = {}
    const isEditing = true
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    const stub = jest.fn()
    wrapper.setMethods({ editCard: stub })

    wrapper.find('.edit-card').trigger('click')
    expect(wrapper.vm.editCard).toBeCalled()
  })

  it('Calls click delete', () => {
    const cardConfiguration = {
      widget: {
        id: 'textarea',
        formFields: [{
          id: 'text',
          value: ''
        }]
      }
    }
    const selectedArea = {}
    const isEditing = true
    const wrapper = shallowMount(DashboardWidget, {
      propsData: { cardConfiguration, selectedArea, isEditing }
    })

    const button = wrapper.find('.edit')
    button.trigger('click')
    expect(wrapper.emitted().edit).toBeTruthy()
  })
})
