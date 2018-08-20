import Observation from '@/store/observation'
import Axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn()
}))

describe('observation.js', () => {
  it('Calls getAreaInfos and answers', async () => {
    Axios.get.mockReturnValue({data: true})
    const observations = await Observation.getAllObservationsType(1)
    expect(Axios.get).toBeCalled()
    expect(observations).toBe(true)
  })

  it('Calls getAreaInfos and throw error', async () => {
    Axios.get.mockRejectedValue(new Error('Async error'))
    const observations = await Observation.getAllObservationsType(1)
    expect(Axios.get).toBeCalled()
    expect(observations).toEqual([])
  })

  it('Calls getObservationTimeSeries and answers', async () => {
    Axios.get.mockReturnValue({data: {
      variable: {
        timeseries_data: 'timeseries_data'
      }
    }})
    const observations = await Observation.getObservationTimeSeries('type', 'id', 'start', 'end', 'variable')
    expect(Axios.get).toBeCalled()
    expect(observations).toBe('timeseries_data')
  })

  it('Calls getObservationTimeSeries and throw error', async () => {
    Axios.get.mockRejectedValue(new Error('Async error'))
    const observations = await Observation.getObservationTimeSeries('type', 'id', 'start', 'end', 'variable')
    expect(Axios.get).toBeCalled()
    expect(observations).toEqual([])
  })
})
