import { Control, DomUtil, DomEvent, Util } from 'leaflet'

export var CustomVueControl = Control.extend({

  mountedComponent: {},

  options: {
    position: 'topleft',

    VueConstructor: {}
  },

  initialize: function (ctor, options = {}) {
    options.VueConstructor = ctor
    Util.setOptions(this, options)
  },

  onAdd: function (map) {
    var container = DomUtil.create('div', 'leaflet-control-custom-vue')
    var div = DomUtil.create('div')
    DomEvent.disableClickPropagation(container)
    container.appendChild(div)

    this.mountedComponent = new this.options.VueConstructor().$mount(div)
    return container
  }
})
