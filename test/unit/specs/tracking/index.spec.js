import Tracking from '@/tracking'

Object.defineProperty(document, 'createElement', {
  value: function () {
    return [{}]
  }
})

Object.defineProperty(document, 'getElementsByTagName', {
  value: function () {
    return [{
      parentNode: {
        insertBefore: function () {}
      }
    }]
  }
})

describe('tracking.js', () => {
  it('Calls init', () => {
    Tracking.init('trackerUrl', 'siteId')
    expect(window._paq.length).toBe(4)
  })
})
