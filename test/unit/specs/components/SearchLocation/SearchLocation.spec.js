import SearchLocation from '@/components/SearchLocation/SearchLocation.vue'
import { mount } from '@vue/test-utils'
import Area from '@/store/area'

jest.mock('@/store/area', () => ({
  searchAreas: jest.fn(),
  getSelectedArea: jest.fn(),
  setSelectedArea: jest.fn()
}))

const mockAllAreas = [
  {
    name: 'aaa'
  }, {
    name: 'aab'
  }, {
    name: 'aac'
  }, {
    name: 'aba'
  }, {
    name: 'abb'
  }, {
    name: 'abc'
  }
]
const matchMoreThan5Results = 'a'
const match4Results = 'ab'
const matchNoResult = 'abd'

describe('SearchLocation.vue', () => {
  let wrapper
  let inputElem

  function checkNbResult (nb) {
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.vm.arrowCounter).toBe(0)
    const autocompleteResult = wrapper.findAll('li')
    // For the map opening
    expect(autocompleteResult.length).toBe(nb)
    if (nb) {
      checkActiveResult(0)
    }
  }
  function checkActiveResult (nb) {
    const autocompleteResult = wrapper.findAll('li')
    expect(wrapper.vm.arrowCounter).toBe(nb)
    expect(autocompleteResult.at(nb).classes()).toContain('active')
    expect(wrapper.findAll('.active').length).toBe(1)
  }

  beforeEach(() => {
    Area.getSelectedArea.mockClear()
    Area.getSelectedArea.mockReturnValue()
    wrapper = mount(SearchLocation)
    inputElem = wrapper.find('input')
  })

  it('Create without selected area', () => {
    expect(wrapper.vm.areas).toEqual([])
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('Create with selected area', () => {
    const wrapper = mount(SearchLocation, {
      propsData: {
        value: {
          name: 'name'
        }
      }
    })
    expect(wrapper.vm.areas).toEqual([])
    expect(wrapper.vm.search).toBe('name')
    expect(wrapper.find('input').element.value).toBe('name')
  })

  it('On change without value', () => {
    inputElem.trigger('input')
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.emitted().input).toBeFalsy()
  })

  it('On change with value no matched', async () => {
    Area.searchAreas.mockReturnValue(Promise.resolve([]))
    wrapper.vm.search = matchNoResult
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    expect(Area.searchAreas).toHaveBeenCalledWith(matchNoResult)
    await wrapper.vm.$nextTick()
    checkNbResult(0)
  })

  it('On change with value match more than 5 results', async () => {
    Area.searchAreas.mockReturnValue(Promise.resolve(mockAllAreas))
    wrapper.vm.search = matchMoreThan5Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    expect(Area.searchAreas).toHaveBeenCalledWith(matchMoreThan5Results)
    await wrapper.vm.$nextTick()
    checkNbResult(5)
  })

  it('On change with value match less than 5 results', async () => {
    Area.searchAreas.mockReturnValue(Promise.resolve(mockAllAreas.filter(a => a.name.indexOf(match4Results) !== -1)))
    wrapper.vm.search = match4Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    expect(Area.searchAreas).toHaveBeenCalledWith(match4Results)
    await wrapper.vm.$nextTick()
    checkNbResult(4)
  })

  it('On focus without value', () => {
    inputElem.trigger('focus')
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.vm.isOpen).toBe(true)
  })

  async function display4Results () {
    Area.searchAreas.mockReturnValue(Promise.resolve(mockAllAreas.filter(a => a.name.indexOf(match4Results) !== -1)))
    wrapper.vm.search = match4Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('focus')
    await wrapper.vm.$nextTick()
    checkNbResult(4)
  }

  it('On focus with value', display4Results)

  it('On keyup arrow down', async () => {
    await display4Results()
    inputElem.trigger('keyup.down')
    checkActiveResult(1)
    inputElem.trigger('keyup.down')
    checkActiveResult(2)
    inputElem.trigger('keyup.down')
    checkActiveResult(3)
    // Limit of results
    inputElem.trigger('keyup.down')
    checkActiveResult(3)
  })

  it('On keyup arrow up', async () => {
    await display4Results()
    inputElem.trigger('keyup.down')
    checkActiveResult(1)
    inputElem.trigger('keyup.up')
    checkActiveResult(0)
    // Limit of results
    inputElem.trigger('keyup.up')
    checkActiveResult(0)
  })

  it('On keyup enter', async () => {
    await display4Results()
    inputElem.trigger('keyup.down')
    checkActiveResult(1)
    inputElem.trigger('keyup.enter')
    expect(wrapper.emitted().input).toEqual([[mockAllAreas[3]]])
    expect(wrapper.vm.search).toBe(mockAllAreas[3].name)
    expect(wrapper.find('input').element.value).toBe(mockAllAreas[3].name)
  })

  it('On click on result', async () => {
    await display4Results()
    const autocompleteResult = wrapper.findAll('li')
    autocompleteResult.at(1).trigger('click')
    expect(wrapper.emitted().input).toEqual([[mockAllAreas[3]]])
    expect(wrapper.find('input').element.value).toBe(mockAllAreas[3].name)
    expect(wrapper.vm.search).toBe(mockAllAreas[3].name)
  })

  it('On click outside', async () => {
    await display4Results()
    expect(wrapper.vm.isOpen).toBe(true)
    wrapper.vm.handleClickOutside({})
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.vm.arrowCounter).toBe(-1)
  })

  it('On click inside', async () => {
    await display4Results()
    expect(wrapper.vm.isOpen).toBe(true)
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('On change value from parent', async () => {
    Area.getSelectedArea.mockReturnValue({
      name: 'name'
    })
    const wrapper = mount(SearchLocation, {
      propsData: {
        value: {
          name: 'name'
        }
      }
    })

    expect(wrapper.vm.search).toBe('name')
    expect(wrapper.find('input').element.value).toBe('name')

    wrapper.setProps({
      value: {
        name: 'name2'
      }
    })

    expect(wrapper.vm.search).toBe('name2')
    expect(wrapper.find('input').element.value).toBe('name2')
  })

  it('On delete value from parent', async () => {
    Area.getSelectedArea.mockReturnValue({
      name: 'name'
    })
    const wrapper = mount(SearchLocation, {
      propsData: {
        value: {
          name: 'name'
        }
      }
    })
    expect(wrapper.vm.search).toBe('name')
    expect(wrapper.find('input').element.value).toBe('name')

    wrapper.setProps({
      value: false
    })

    expect(wrapper.vm.search).toBe('name')
    expect(wrapper.find('input').element.value).toBe('name')
  })

  it('On click outside and reinit value', async () => {
    await display4Results()
    wrapper.vm.prevValue = {name: 'prevValue'}
    expect(wrapper.vm.search).toBe(match4Results)
    wrapper.vm.handleClickOutside({})
    expect(wrapper.vm.search).toBe('prevValue')
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
