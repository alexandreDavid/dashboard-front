import { Control, DomUtil } from 'leaflet'

export var NorthArrow = Control.extend({
  // @section
  // @aka Control.NorthArrow options
  options: {
    position: 'bottomleft'
  },

  onAdd: function (map) {
    this._map = map

    // Create arrow container
    var container = DomUtil.create('div', 'leaflet-north-arrow')

    // insert svg
    var path = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="75px" height="75px" viewBox="0 0 75 75" enable-background="new 0 0 75 75" xml:space="preserve">
    <polygon stroke="#000000" stroke-width="0.2" stroke-miterlimit="10" points="13.459,57.609 37.499,2.141 61.541,57.609 
    37.499,41.677 "/>
    <text transform="matrix(1 0 0 1 27.9595 72.1211)" font-family="'MyriadPro-Regular'" font-size="29">N</text>
    </svg>`
    container.innerHTML = path

    return container
  }
})

// @factory L.control.northArrow(options?: Control.NorthArrow options)
// Creates a north arrow control with the given options.
export var northArrow = function (options) {
  return new NorthArrow(options)
}
