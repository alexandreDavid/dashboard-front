import Parameter from '@/store/parameter'
import Data from '@/store/data'

let parametersFromStructure = [
  {
    workspaceName: 'workspaceName',
    paramName: 'paramName',
    isActive: true
  }, {
    workspaceName: 'workspaceName2',
    paramName: 'paramName2',
    isActive: false
  }, {
    workspaceName: 'workspaceName3',
    paramName: 'paramName3',
    isActive: true
  }
]
// let [param1, , param3] = parametersFromStructure

jest.mock('@/store/data', () => ({
  getStructure: jest.fn()
}))

Data.getStructure.mockReturnValue({
  parameters: [ ...parametersFromStructure ],
  parameterGroupings: 'parameterGroupings'
})

process.env.GEOSERVER_URL = 'GEOSERVER_URL'

describe('parameter.js', () => {
  it('Calls getAllParameters getParams', async () => {
    const params = await Parameter.getAllParameters()
    // expect(params[0]).toEqual(Parameter.getParameterInfos(param1))
    // expect(params[1]).toEqual(Parameter.getParameterInfos(param3))
    expect(params).toBe(Parameter.getParams())
  })

  it('Calls getAllParameterGroupings', async () => {
    const parameterGroupings = await Parameter.getAllParameterGroupings()
    expect(Data.getStructure).toBeCalled()
    expect(parameterGroupings).toBe('parameterGroupings')
  })

  it('Calls setDisplayedParameter, getDisplayedParameter', () => {
    Parameter.setDisplayedParameters('displayedParameter')
    expect(Parameter.getDisplayedParameters()).toEqual('displayedParameter')
  })
})
