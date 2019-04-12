export default {
  getDefaultTime (times) {
    let nowIndex = 0
    const now = Date.now()
    for (let timeIdx in times) {
      if (Date.parse(times[timeIdx]) < now) {
        nowIndex = timeIdx
      }
    }
    // If index outside the range, we take the first value
    if (+nowIndex === (times.length - 1)) {
      nowIndex = 0
    }
    return times[nowIndex]
  }
}
