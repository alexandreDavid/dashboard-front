import SearchLocation from '@/components/SearchLocation/SearchLocation.vue'
import { mount } from '@vue/test-utils'
import Area from '@/store/area'

jest.mock('@/store/area', () => ({
  getAllAreas: jest.fn(),
  getSelectedArea: jest.fn(),
  setSelectedArea: jest.fn()
}))

const mockAllAreas = [
  {
    displayName: 'aaa'
  }, {
    displayName: 'aab'
  }, {
    displayName: 'aac'
  }, {
    displayName: 'aba'
  }, {
    displayName: 'abb'
  }, {
    displayName: 'abc'
  }
]
const matchMoreThan5Results = 'a'
const match4Results = 'ab'
const matchNoResult = 'abd'

Area.getAllAreas.mockReturnValue(Promise.resolve(mockAllAreas))

describe('SearchLocation.vue', () => {
  let wrapper
  let inputElem

  function checkNbResult (nb) {
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.vm.arrowCounter).toBe(0)
    const autocompleteResult = wrapper.findAll('.autocomplete-result')
    expect(autocompleteResult.length).toBe(nb)
    if (nb) {
      checkActiveResult(0)
    }
  }
  function checkActiveResult (nb) {
    const autocompleteResult = wrapper.findAll('.autocomplete-result')
    expect(wrapper.vm.arrowCounter).toBe(nb)
    expect(autocompleteResult.at(nb).classes()).toContain('is-active')
    expect(wrapper.findAll('.is-active').length).toBe(1)
  }

  beforeEach(async () => {
    Area.getSelectedArea.mockClear()
    Area.getSelectedArea.mockReturnValue()
    wrapper = mount(SearchLocation)
    await wrapper.vm.$nextTick()
    inputElem = wrapper.find('input')
  })

  it('Create without selected area', () => {
    expect(Area.getAllAreas).toBeCalled()
    expect(wrapper.vm.areas).toEqual(mockAllAreas)
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.find('input').element.value).toBe('')
  })

  it('Create with selected area', async () => {
    Area.getSelectedArea.mockReturnValue({
      displayName: 'displayName'
    })
    const wrapper = mount(SearchLocation)
    expect(Area.getAllAreas).toBeCalled()
    await wrapper.vm.$nextTick()
    expect(Area.getAllAreas).toBeCalled()
    expect(wrapper.vm.areas).toEqual(mockAllAreas)
    expect(wrapper.vm.search).toBe('displayName')
    expect(wrapper.find('input').element.value).toBe('displayName')
  })

  it('On change without value', () => {
    inputElem.trigger('input')
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.emitted().input).toBeTruthy()
  })

  it('On change with value no matched', () => {
    wrapper.vm.search = matchNoResult
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    checkNbResult(0)
  })

  it('On change with value match more than 5 results', () => {
    wrapper.vm.search = matchMoreThan5Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    checkNbResult(5)
  })

  it('On change with value match less than 5 results', () => {
    wrapper.vm.search = match4Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('input')
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.vm.arrowCounter).toBe(0)
    checkNbResult(4)
  })

  it('On focus without value', () => {
    inputElem.trigger('focus')
    expect(wrapper.vm.search).toBe('')
    expect(wrapper.vm.isOpen).toBe(false)
  })

  function display4Results () {
    wrapper.vm.search = match4Results
    expect(wrapper.vm.isOpen).toBe(false)
    inputElem.trigger('focus')
    checkNbResult(4)
  }

  it('On focus with value', display4Results)

  it('On keyup arrow down', () => {
    display4Results()
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

  it('On keyup arrow up', () => {
    display4Results()
    inputElem.trigger('keyup.down')
    checkActiveResult(1)
    inputElem.trigger('keyup.up')
    checkActiveResult(0)
    // Limit of results
    inputElem.trigger('keyup.up')
    checkActiveResult(0)
  })

  it('On keyup enter', () => {
    display4Results()
    inputElem.trigger('keyup.down')
    checkActiveResult(1)
    inputElem.trigger('keyup.enter')
    expect(wrapper.vm.search).toBe(mockAllAreas[3].displayName)
    expect(wrapper.find('input').element.value).toBe(mockAllAreas[3].displayName)
  })

  it('On click on result', () => {
    display4Results()
    const autocompleteResult = wrapper.findAll('.autocomplete-result')
    autocompleteResult.at(1).trigger('click')
    expect(wrapper.vm.search).toBe(mockAllAreas[3].displayName)
    expect(wrapper.find('input').element.value).toBe(mockAllAreas[3].displayName)
  })

  it('On click outside', () => {
    display4Results()
    expect(wrapper.vm.isOpen).toBe(true)
    wrapper.vm.handleClickOutside({})
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.vm.arrowCounter).toBe(-1)
  })

  it('On click inside', () => {
    display4Results()
    expect(wrapper.vm.isOpen).toBe(true)
    wrapper.vm.handleClickOutside({target: wrapper.vm.$el})
    expect(wrapper.vm.isOpen).toBe(true)
  })

  it('On destroy', () => {
    document.removeEventListener = jest.fn()
    wrapper.destroy()
    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
