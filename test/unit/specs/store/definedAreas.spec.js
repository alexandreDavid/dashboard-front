import DefinedAreas from '@/store/definedAreas'

import UserConfiguration from '@/store/userConfiguration'

jest.mock('@/store/userConfiguration', () => ({
  getDefinedAreas: jest.fn(),
  setDefinedAreas: jest.fn(),
  getActiveArea: jest.fn(),
  removeActiveArea: jest.fn()
}))

describe('definedAreas.js', () => {
  beforeEach(function () {
    UserConfiguration.getDefinedAreas.mockClear()
    UserConfiguration.setDefinedAreas.mockClear()
    UserConfiguration.getActiveArea.mockClear()
    UserConfiguration.removeActiveArea.mockClear()
  })

  it('Calls getAll with defined areas', () => {
    const mockGetDefinedAreas = ['mockGetDefinedAreas']
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    const res = DefinedAreas.getAll()
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(res).toEqual(mockGetDefinedAreas)
  })

  it('Calls getAll without defined areas but active area', () => {
    const mockGetDefinedAreas = []
    const mockGetActiveArea = {id: 25}
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    UserConfiguration.getActiveArea.mockReturnValue(mockGetActiveArea)
    const res = DefinedAreas.getAll()
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(UserConfiguration.getActiveArea).toHaveBeenCalledTimes(1)
    expect(res).toEqual([{ id: 1, idArea: 25 }])
  })

  it('Calls getAll without defined areas and without active area', () => {
    const mockGetDefinedAreas = []
    const mockGetActiveArea = false
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    UserConfiguration.getActiveArea.mockReturnValue(mockGetActiveArea)
    const res = DefinedAreas.getAll()
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(UserConfiguration.getActiveArea).toHaveBeenCalledTimes(1)
    expect(res).toEqual([])
  })

  it('Calls setAll', () => {
    const mockAllAreas = 'mockAllAreas'
    const res = DefinedAreas.setAll(mockAllAreas)
    expect(UserConfiguration.setDefinedAreas).toHaveBeenCalledTimes(1)
    expect(UserConfiguration.removeActiveArea).toHaveBeenCalledTimes(1)
    expect(res).toEqual(mockAllAreas)
  })

  it('Calls getActiveArea with active area', () => {
    const mockActiveArea = {active: true}
    const mockGetDefinedAreas = [{}, mockActiveArea]
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    const res = DefinedAreas.getActiveArea()
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(res).toBe(mockActiveArea)
  })

  it('Calls getActiveArea without active area', () => {
    const mockFirstArea = {active: false}
    const mockGetDefinedAreas = [mockFirstArea, {}, {}]
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    const res = DefinedAreas.getActiveArea()
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(res).toBe(mockFirstArea)
  })

  it('Calls setActiveArea', () => {
    const mockGetDefinedAreas = [{id: 1, active: true}, {id: 2}, {id: 3}]
    UserConfiguration.getDefinedAreas.mockReturnValue(mockGetDefinedAreas)
    const mockactiveArea = {id: 2, label: 'mockactiveArea'}
    DefinedAreas.setActiveArea(mockactiveArea)
    expect(UserConfiguration.getDefinedAreas).toHaveBeenCalledTimes(1)
    expect(UserConfiguration.setDefinedAreas).toHaveBeenCalledTimes(1)
    expect(UserConfiguration.removeActiveArea).toHaveBeenCalledTimes(1)
  })
})
