import securedInstance from './securedInstance'
import AbstractSecuredApiClass from './abstractSecuredApiClass'

let dashboardsApi = new AbstractSecuredApiClass('dashboards')

dashboardsApi.getShared = async () => {
  try {
    const response = await securedInstance().get('/dashboards/shared')
    return response.data
  } catch (e) {
    return false
  }
}

dashboardsApi.setShared = async (dashboard, shared) => {
  try {
    const response = await securedInstance().patch(`/dashboards/${dashboard.id}`, { shared })
    return response.data
  } catch (e) {
    return false
  }
}

export default dashboardsApi
