export default {
  getGradientColor (values) {
    return `linear-gradient(to right, ${values.map(d => this.convertHex(d.color)).join(', ')})`
  },
  convertHex (hex) {
    const r = parseInt(hex.substring(1, 3), 16)
    const g = parseInt(hex.substring(3, 5), 16)
    const b = parseInt(hex.substring(5, 7), 16)
    return `rgba(${r}, ${g}, ${b})`
  }
}
