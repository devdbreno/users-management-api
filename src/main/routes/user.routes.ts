import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { makeAddUserController, makeLoadUsersController } from '@main/factories'

export default (router: Router): void => {
  router.get('/users', adaptRoute(makeLoadUsersController()))
  router.post('/users', adaptRoute(makeAddUserController()))
}
