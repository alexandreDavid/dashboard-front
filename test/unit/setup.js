import Vue from 'vue'
import '@/utils/fontAwesome'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(VueAnalytics, {id: '1'})

var localStorageMock = (function () {
  var store = {}

  return {
    getItem: function (key) {
      return store[key]
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock
// })

Object.defineProperty(global, 'Node', {
  value: {firstElementChild: 'firstElementChild'}
})

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn
    }
  })
})

jest.mock('@/api/securedInstance', () => {
  return jest.fn().mockImplementation(() => {})
})
