import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeAddUserController } from '@main/factories'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeAddUserController()))
}
