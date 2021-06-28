import { Router } from 'express'

import { adaptRoute } from '@main/adapters'
import { addUserValidator } from '@main/middlewares'
import { makeAddUserController, makeLoadUsersController } from '@main/factories'

export default (router: Router): void => {
  router.get('/users', adaptRoute(makeLoadUsersController()))
  router.post('/users', addUserValidator, adaptRoute(makeAddUserController()))
}
