// Default piwik global variable
window._paq = []

export default {
  init (trackerUrl, siteId) {
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    window._paq.push(['trackPageView'])
    window._paq.push(['enableLinkTracking']);
    (function () {
      window._paq.push(['setTrackerUrl', trackerUrl + 'piwik.php'])
      window._paq.push(['setSiteId', siteId])
      var d = document
      var g = d.createElement('script')
      var s = d.getElementsByTagName('script')[0]
      Object.assign(g, {type: 'text/javascript', async: true, defer: true, src: `${trackerUrl}piwik.js`})
      s.parentNode.insertBefore(g, s)
    })()
  }
}
