import { shallowMount } from '@vue/test-utils'
import DashboardWidget from '@/components/Dashboard/DashboardWidget.vue'
import { WidgetGraph, WidgetImage, WidgetMap, WidgetTable, WidgetTextArea } from '@/components/Dashboard/Widgets'

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
