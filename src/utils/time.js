export default {
  getDefaultTime (times) {
    let nowIndex = 0
    const now = Date.now()
    for (let timeIdx in times) {
      if (Date.parse(times[timeIdx]) < now) {
        nowIndex = timeIdx
      }
    }
    return times[nowIndex]
  }
}
