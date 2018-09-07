export default {
  convertDate (date) {
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let d = new Date(date)
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
  },
  colors: {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    grey: 'rgb(201, 203, 207)',
    purple: 'rgb(153, 102, 255)'
  }
}
