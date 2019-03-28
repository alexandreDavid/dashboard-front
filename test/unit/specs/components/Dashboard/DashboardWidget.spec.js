import { shallowMount } from '@vue/test-utils'
import DashboardWidget from '@/components/Dashboard/DashboardWidget.vue'
import { WidgetGraph, WidgetImage, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'
import ConfirmModal from '@/components/Modal/ConfirmModal'

function checkRenderType (type, widgetComponent) {
  const cardConfiguration = {
    title: `title-${type}`,
    type
  }
  const selectedArea = {}
  const isEditing = false
  const wrapper = shallowMount(DashboardWidget, {
    propsData: { cardConfiguration, selectedArea, isEditing }
  })

  expect(wrapper.is(DashboardWidget)).toBe(true)
  expect(wrapper.contains(widgetComponent)).toBe(true)
}

describe('DashboardWidget.vue', () => {
  it('should render correct widget graph', () => {
    checkRenderType('graph', WidgetGraph)
  })

  it('should render correct widget image', () => {
    checkRenderType('image', WidgetImage)
  })

  it('should render correct widget map', () => {
    checkRenderType('map', WidgetMap)
  })

  it('should render correct widget table', () => {
    checkRenderType('table', WidgetTable)
  })

  it('should render correct widget textarea', () => {
    checkRenderType('textarea', WidgetTextArea)
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

    wrapper.find('.drag-handler').trigger('mouseover')

    wrapper.find('.edit-card').trigger('click')
    expect(wrapper.emitted().edit).toBeTruthy()
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

    wrapper.find('.drag-handler').trigger('mouseover')

    const button = wrapper.find('.delete')
    button.trigger('click')
    expect(wrapper.contains(ConfirmModal)).toBe(true)
    expect(wrapper.vm.showConfirmDelete).toBe(true)
    wrapper.find(ConfirmModal).vm.$emit('confirm')
    expect(wrapper.emitted().delete).toBeTruthy()
  })
})
