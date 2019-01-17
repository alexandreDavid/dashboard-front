import UserConfiguration from '@/store/userConfiguration'

describe('userConfiguration.js', () => {
  it('Init correctly', async () => {
    expect(Object.keys(UserConfiguration).length).toEqual(21)
  })

  it('Calls get successful without value', () => {
    expect(UserConfiguration.getDisplayHelp()).toBe(true)
  })

  it('Calls get successful with value', () => {
    localStorage.clear()
    let displayedValue = 'displayHelpValue'
    UserConfiguration.setDisplayHelp(displayedValue)
    expect(UserConfiguration.getDisplayHelp()).toBe(displayedValue)
  })
})
