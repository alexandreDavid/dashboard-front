import * as Updates from './list'
import UserConfiguration from '@/store/userConfiguration'

const update = () => {
  let idx = UserConfiguration.getUpdateIndex()
  idx++
  const updateFunc = Updates[`update${idx}`]
  if (typeof updateFunc === 'function') {
    updateFunc()
    UserConfiguration.setUpdateIndex(idx)
    update()
  }
}

export default update
