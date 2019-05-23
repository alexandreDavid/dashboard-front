import securedInstance from './securedInstance'

export default {
  async getAllUsersCsv () {
    const response = await securedInstance().get('/users/csv')
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'dfms-users.csv')
    document.body.appendChild(link)
    link.click()
  },
  async setRole (user, role) {
    try {
      const response = await securedInstance().patch(`/users/${user.id}`, { role })
      return response.data
    } catch (e) {
      return false
    }
  }
}
